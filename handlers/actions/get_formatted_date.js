const moment = require('../../lib/moment-datetime')

module.exports = async (timezone, args, app) => {
  const day = moment({ timezone }).add(args.daysToAdd, 'days')
  const token = app.homey.flow.getToken('formatted_date')
  if (!token) {
    app.log('get_formatted_date: Token "formatted_date" not found')
    return false
  }

  try {
    await token.setValue(day.format(args.format))
    return true
  } catch (ex) {
    app.error('[ERROR] - Failed to set value on formatted_date token:', ex)
    return false
  }
}
