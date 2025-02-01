const { describe, test, expect } = require('@jest/globals')

const check = require('../../handlers/conditions/value_too_long')
const mockOptions = require('../lib/mock-options')

describe('Return true when', () => {
  test('Length of "value" is shorter than "maxLength"', async () => {
    const options = {
      ...mockOptions,
      args: {
        maxLength: 10,
        value: 'hello'
      }
    }
    const result = await check(options)
    expect(result).toBeTruthy()
  })
})

describe('Return false when', () => {
  test('Length of "value" is greater than "maxLength"', async () => {
    const options = {
      ...mockOptions,
      args: {
        maxLength: 4,
        value: 'hello'
      }
    }
    const result = await check(options)
    expect(result).toBeFalsy()
  })

  test('Length of "value" is equal to "maxLength"', async () => {
    const options = {
      ...mockOptions,
      args: {
        maxLength: 5,
        value: 'hello'
      }
    }
    const result = await check(options)
    expect(result).toBeFalsy()
  })

  test('"value" is missing', async () => {
    const options = {
      ...mockOptions,
      args: {
        maxLength: 10
      }
    }
    const result = await check(options)
    expect(result).toBeFalsy()
  })

  test('"maxLength" is missing', async () => {
    const options = {
      ...mockOptions,
      args: {
        value: 'hello'
      }
    }
    const result = await check(options)
    expect(result).toBeFalsy()
  })
})
