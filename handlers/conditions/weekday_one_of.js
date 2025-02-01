const moment = require('../../lib/moment-datetime')

const convertWeekdayStringToNum = (weekdayStrings, weekdays) =>
  weekdays
    .filter(weekDay => weekdayStrings.find(wd => wd.toLowerCase() === weekDay.name.toLowerCase()))
    .map(weekDay => weekDay.number)

const createWeekdaysArray = app => {
  return [
    {
      name: app.__('weekdays.weekdaySunday'),
      number: 0
    },
    {
      name: app.__('weekdays.weekdayMonday'),
      number: 1
    },
    {
      name: app.__('weekdays.weekdayTuesday'),
      number: 2
    },
    {
      name: app.__('weekdays.weekdayWednesday'),
      number: 3
    },
    {
      name: app.__('weekdays.weekdayThursday'),
      number: 4
    },
    {
      name: app.__('weekdays.weekdayFriday'),
      number: 5
    },
    {
      name: app.__('weekdays.weekdaySaturday'),
      number: 6
    }
  ]
}

module.exports = async options => {
  const { timezone, args, app, day } = options

  if (!args.weekdays) {
    app.log('weekday_one_of: Argument \'weekdays\' missing...')
    return false
  }

  const weekdaysArray = createWeekdaysArray(app)
  const weekdayStrings = args.weekdays.split(';')
  const weekdays = convertWeekdayStringToNum(weekdayStrings, weekdaysArray)
  const value = Number.isInteger(day)
    ? day
    : moment({ timezone }).get('weekday')

  app.log('weekday_one_of: Weekdays:', weekdays.join(','), '--', 'WeekdayStrings:', weekdayStrings.join(','))
  app.log("weekday_one_of: Today's weekday:", value)

  const result = weekdays.some(item => value === item)
  app.log("weekday_one_of: Today's weekday is one of:", result)
  return result
}
