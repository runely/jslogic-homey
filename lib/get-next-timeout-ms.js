'use strict'

const moment = require('./moment-datetime')

module.exports = timezone => {
  const now = moment({ timezone })
  const then = moment({ timezone }).set('hours', 0).set('minutes', 0).set('seconds', 0).set('milliseconds', 0).add(1, 'days')
  return then.diff(now, 'milliseconds')
}
