const { describe, test, expect } = require('@jest/globals')

const check = require('../../handlers/conditions/value_empty')
const mockOptions = require('../lib/mock-options')

describe('Return true when', () => {
  test('"value" is an empty string', async () => {
    const options = {
      ...mockOptions,
      args: {
        value: ''
      }
    }
    const result = await check(options)
    expect(result).toBeTruthy()
  })

  test('"value" is one whitespace', async () => {
    const options = {
      ...mockOptions,
      args: {
        value: ' '
      }
    }
    const result = await check(options)
    expect(result).toBeTruthy()
  })
})

describe('Return false when', () => {
  test('"value" is one letter', async () => {
    const options = {
      ...mockOptions,
      args: {
        value: 'h'
      }
    }
    const result = await check(options)
    expect(result).toBeFalsy()
  })

  test('"value" is one word', async () => {
    const options = {
      ...mockOptions,
      args: {
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
        array: ['hi', 'hei', 'yo'].join(';'),
        casesenitive: 'false'
      }
    }
    const result = await check(options)
    expect(result).toBeFalsy()
  })

  test('"value" is undefined', async () => {
    const options = {
      ...mockOptions,
      args: {
        value: undefined
      }
    }
    const result = await check(options)
    expect(result).toBeFalsy()
  })

  test('"value" is null', async () => {
    const options = {
      ...mockOptions,
      args: {
        value: null
      }
    }
    const result = await check(options)
    expect(result).toBeFalsy()
  })
})
