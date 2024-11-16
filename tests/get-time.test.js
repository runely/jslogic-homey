const getTime = require('../lib/get-time')
const moment = require('../lib/moment-datetime')
const now = moment()

describe('Date with', () => {
  test('valid format HH:mm -> Returns moment', () => {
    const time = getTime('08:30')
    expect(time.get('date')).toBe(now.get('date'))
    expect(time.get('month')).toBe(now.get('month'))
    expect(time.get('year')).toBe(now.get('year'))
    expect(time.get('hour')).toBe(8)
    expect(time.get('minute')).toBe(30)
  })

  test('valid format HH.mm -> Returns moment', () => {
    const time = getTime('08.30')
    expect(time.get('date')).toBe(now.get('date'))
    expect(time.get('month')).toBe(now.get('month'))
    expect(time.get('year')).toBe(now.get('year'))
    expect(time.get('hour')).toBe(8)
    expect(time.get('minute')).toBe(30)
  })

  test('INVALID format hi:mm -> Returns NaN', () => {
    expect(isNaN(getTime('hi:30'))).toBeTruthy()
  })
})
