import { describe, test, expect } from '@jest/globals'

import getDateTime from '../lib/get-date-time'

describe('DateTime with', () => {
  test('valid format dd.MM.yyyy HH:mm -> Returns moment', () => {
    const dateTime = getDateTime('01.12.2021 08:30')
    expect(dateTime.get('date')).toBe(1)
    expect(dateTime.get('month')).toBe(11)
    expect(dateTime.get('year')).toBe(2021)
    expect(dateTime.get('hour')).toBe(8)
    expect(dateTime.get('minute')).toBe(30)
  })

  test('valid format dd/MM/yyyy HH.mm -> Returns moment', () => {
    const dateTime = getDateTime('01/12/2021 08.30')
    expect(dateTime.get('date')).toBe(1)
    expect(dateTime.get('month')).toBe(11)
    expect(dateTime.get('year')).toBe(2021)
    expect(dateTime.get('hour')).toBe(8)
    expect(dateTime.get('minute')).toBe(30)
  })

  test('valid format dd-MM-yyyy HH:mm -> Returns moment', () => {
    const dateTime = getDateTime('01-12-2021 08:30')
    expect(dateTime.get('date')).toBe(1)
    expect(dateTime.get('month')).toBe(11)
    expect(dateTime.get('year')).toBe(2021)
    expect(dateTime.get('hour')).toBe(8)
    expect(dateTime.get('minute')).toBe(30)
  })
})
