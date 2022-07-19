'use strict'

const moment = require('./moment-datetime')
const pad = require('./pad-number')

module.exports = (date, timezone) => {
  const dateSplit = date.split(/[/.-]/)

  return moment({ timezone, date: `${dateSplit[2]}-${pad(dateSplit[1])}-${pad(dateSplit[0])}` })
}
