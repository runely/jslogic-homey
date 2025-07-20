import { describe, test, expect } from '@jest/globals'

import pad from '../lib/pad-number'

describe('Number', () => {
  test('higher than 10 is not padded', () => {
    expect(pad(12)).toBe('12')
  })
  
  test('10 is not padded', () => {
    expect(pad(10)).toBe('10')
  })
  
  test('lower than 10 is padded', () => {
    expect(pad(8)).toBe('08')
  })
})

describe('String number', () => {
  test('higher than 10 is not padded', () => {
    expect(pad('12')).toBe('12')
  })

  test('10 is not padded', () => {
    expect(pad('10')).toBe('10')
  })

  test('lower than 10 (one digit) is padded', () => {
    expect(pad('8')).toBe('08')
  })

  test('lower than 10 (two digits) is not padded', () => {
    expect(pad('08')).toBe('08')
  })
})
