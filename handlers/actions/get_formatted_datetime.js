const moment = require('../../lib/moment-datetime')

const convertToType = (num, app) => {
  if ([1, '1'].includes(num)) return 'minutes'
  else if ([2, '2'].includes(num)) return 'hours'
  else if ([3, '3'].includes(num)) return 'days'
  else if ([4, '4'].includes(num)) return 'weeks'
  else {
    app.log(`get_formatted_datetime: Type num (${num}) isn't defined. Using minutes!`)
    return 'minutes'
  }
}

module.exports = async (timezone, args, app) => {
  const type = convertToType(args.type, app)
  const time = moment({ timezone }).add(args.toAdd, type)
  const token = app.homey.flow.getToken('formatted_datetime')
  if (!token) {
    app.log('get_formatted_datetime: Token "formatted_time" not found')
    return false
  }
  await token.setValue(time.format(args.format))
  return true
}
