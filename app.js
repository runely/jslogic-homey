'use strict'

const Homey = require('homey')
const moment = require('./lib/moment-datetime')
const getNextTimeout = require('./lib/get-next-timeout-ms')

const { flow: { actions, conditions, triggers } } = Homey.manifest

class JSLogic extends Homey.App {
  async onInit () {
    this.log(`${Homey.manifest.name.en} v${Homey.manifest.version} is running on ${this.homey.version}...`)

    // create flow tokens
    await this.homey.flow.createToken('formatted_date', { type: 'string', title: this.homey.__('flowTokens.formatted_date') })
    await this.homey.flow.createToken('formatted_datetime', { type: 'string', title: this.homey.__('flowTokens.formatted_datetime') })

    // timezone
    const timezone = this.homey.clock.getTimezone()

    // register action runListeners
    actions.forEach(({ id }) => {
      this.log('Adding runListener for action', id)
      this.homey.flow.getActionCard(id)
        .registerRunListener(async (args, state) => {
          const action = require(`./handlers/actions/${id}`)
          return await action(timezone, args, this)
        })
    })

    // register condition runListeners
    conditions.forEach(({ id }) => {
      this.log('Adding runListener for condition', id)
      this.homey.flow.getConditionCard(id)
        .registerRunListener(async (args, state) => {
          const condition = require(`./handlers/conditions/${id}`)
          return await condition({
            timezone,
            args,
            app: this.homey
          })
        })
    })

    // register trigger runListeners
    triggers.forEach(({ id }) => {
      this.log('Adding runListener for trigger', id)
      this.homey.flow.getTriggerCard(id)
        .registerRunListener((args, state) => {
          const trigger = require(`./handlers/triggers/${id}`)
          return trigger({
            args,
            state,
            app: this.homey
          })
        })
    })

    this.homey.on('unload', () => {
      if (!this.timeouts) return

      Object.getOwnPropertyNames(this.timeouts).forEach(timeout => {
        try {
          this.homey.clearTimeout(timeout)
        } catch {}
      })
    })

    // registers a timeout to trigger the "date_month_becomes" card at 00:00 every night
    const dateMonthBecomes = () => {
      const now = moment({ timezone })
      const nextTimeout = getNextTimeout(timezone)

      this.log('dateMonthBecomes: Triggering "date_month_becomes" card')
      this.homey.flow.getTriggerCard('date_month_becomes').trigger(null, { date: now.get('date'), month: now.get('month') })
      try {
        this.homey.clearTimeout(this.timeouts.dateMonthBecomes)
      } catch {}
      this.timeouts.dateMonthBecomes = this.homey.setTimeout(dateMonthBecomes, nextTimeout)
      this.log(`dateMonthBecomes: Next timeout ${moment({ timezone }).add(nextTimeout, 'milliseconds').format('DD.MM.YY HH:mm:ss')}`)
    }

    const nextTimeout = getNextTimeout(timezone)
    this.timeouts = {
      dateMonthBecomes: this.homey.setTimeout(dateMonthBecomes, nextTimeout)
    }
    this.log(`onInit/dateMonthBecomes: Next timeout ${moment({ timezone }).add(nextTimeout, 'milliseconds').format('DD.MM.YY HH:mm:ss')}`)
  }
}

module.exports = JSLogic
