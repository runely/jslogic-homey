'use strict'

const moment = require('./moment-datetime')
const pad = require('./pad-number')

module.exports = (time, timezone) => {
  const timeSplit = time.split(/[:.]/)
  const now = moment({ timezone })

  return moment({ timezone, date: `${now.get('year')}-${pad(now.get('month') + 1)}-${pad(now.get('date'))}T${pad(timeSplit[0])}:${pad(timeSplit[1])}:00` })
}
