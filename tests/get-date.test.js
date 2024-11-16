const getDate = require('../lib/get-date')

describe('Date with', () => {
  test('valid format dd.MM.yyyy -> Returns moment', () => {
    const date = getDate('01.12.2021')
    expect(date.get('date')).toBe(1)
    expect(date.get('month')).toBe(11)
    expect(date.get('year')).toBe(2021)
  })

  test('valid format dd/MM/yyyy -> Returns moment', () => {
    const date = getDate('01/12/2021')
    expect(date.get('date')).toBe(1)
    expect(date.get('month')).toBe(11)
    expect(date.get('year')).toBe(2021)
  })

  test('valid format dd-MM-yyyy -> Returns moment', () => {
    const date = getDate('01-12-2021')
    expect(date.get('date')).toBe(1)
    expect(date.get('month')).toBe(11)
    expect(date.get('year')).toBe(2021)
  })

  test('INVALID format hi-MM-yyyy -> Returns NaN', () => {
    expect(isNaN(getDate('hi-12-2021'))).toBeTruthy()
  })
})
