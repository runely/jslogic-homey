'use strict'

const moment = require('./moment-datetime')
const pad = require('./pad-number')

module.exports = (dateTime, timezone) => {
  dateTime = dateTime.trim()
  const dateTimeSplit = dateTime.split(' ')
  const dateSplit = dateTimeSplit[0].split(/[/.-]/)
  const timeSplit = dateTimeSplit[(dateTimeSplit.length - 1)].split(/[:.]/)

  return moment({ timezone, date: `${dateSplit[2]}-${pad(dateSplit[1])}-${pad(dateSplit[0])}T${pad(timeSplit[0])}:${pad(timeSplit[1])}:00` })
}
