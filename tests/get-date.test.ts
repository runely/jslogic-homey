import { describe, test, expect } from '@jest/globals'

import getDate from '../lib/get-date'

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
})
