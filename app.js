'use strict'

const { sentry, init } = require('./lib/sentry-io') // { sentry, init, startTransaction }

const Homey = require('homey')
const { flow: { actions, conditions } } = Homey.manifest

const tokens = []

class JSLogic extends Homey.App {
  async onInit () {
    this.log(`${Homey.manifest.name.en} v${Homey.manifest.version} is running on ${this.homey.version}...`)

    // initialize sentry.io
    init(this.homey)
    this.sentry = sentry

    // flow tokens
    tokens.push(await this.homey.flow.createToken('formatted_date', { type: 'string', title: this.homey.__('flowTokens.formatted_date') }))

    // timezone
    const timezone = this.homey.clock.getTimezone()

    // register action runlisteners
    actions.forEach(({ id }) => {
      this.log('Adding runListener for action', id)
      this.homey.flow.getActionCard(id)
        .registerRunListener(async (args, state) => {
          const action = require(`./handlers/actions/${id}`)
          const result = await action(timezone, tokens, args)
          return Promise.resolve(result)
        })
    })

    // register condition runlisteners
    conditions.forEach(({ id }) => {
      this.log('Adding runListener for condition', id)
      this.homey.flow.getConditionCard(id)
        .registerRunListener(async (args, state) => {
          const condition = require(`./handlers/conditions/${id}`)
          const result = await condition({
            timezone,
            args,
            app: this.homey
          })
          return Promise.resolve(result)
        })
    })
  }
}

module.exports = JSLogic
