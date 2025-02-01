const { describe, test, expect } = require('@jest/globals')

const check = require('../../handlers/conditions/monthnum_between_monthnum')
const mockOptions = require('../lib/mock-options')

describe('Return true when', () => {
  test('Month is after "monthOne" this month and before "monthTwo" this month', async () => {
    const options = {
      ...mockOptions,
      args: {
        monthOne: '4',
        monthTwo: '6'
      },
      month: '5'
    }
    const result = await check(options)
    expect(result).toBeTruthy()
  })

  test('Month is after "monthOne" last year and before "monthTwo" this year', async () => {
    const options = {
      ...mockOptions,
      args: {
        monthOne: '10',
        monthTwo: '3'
      },
      month: '11'
    }
    const result = await check(options)
    expect(result).toBeTruthy()
  })

  test('Month is after "monthOne" last year and before "monthTwo" this year', async () => {
    const options = {
      ...mockOptions,
      args: {
        monthOne: '10',
        monthTwo: '3'
      },
      month: '1'
    }
    const result = await check(options)
    expect(result).toBeTruthy()
  })

  test('Month is equal to "monthOne" which is equal to "monthTwo"', async () => {
    const options = {
      ...mockOptions,
      args: {
        monthOne: '10',
        monthTwo: '10'
      },
      month: '10'
    }
    const result = await check(options)
    expect(result).toBeTruthy()
  })
})

describe('Return false when', () => {
  test('Month is before "monthOne" and before "monthTwo"', async () => {
    const options = {
      ...mockOptions,
      args: {
        monthOne: '19',
        monthTwo: '20'
      },
      month: '10'
    }
    const result = await check(options)
    expect(result).toBeFalsy()
  })

  test('"monthOne" is missing', async () => {
    const options = {
      ...mockOptions,
      args: {
        monthTwo: '20'
      }
    }
    const result = await check(options)
    expect(result).toBeFalsy()
  })

  test('"monthTwo" is missing', async () => {
    const options = {
      ...mockOptions,
      args: {
        monthOne: '19'
      }
    }
    const result = await check(options)
    expect(result).toBeFalsy()
  })

  test('"monthOne" is an empty string', async () => {
    const options = {
      ...mockOptions,
      args: {
        monthOne: '',
        monthTwo: '20'
      }
    }
    const result = await check(options)
    expect(result).toBeFalsy()
  })

  test('"monthTwo" is an empty string', async () => {
    const options = {
      ...mockOptions,
      args: {
        monthOne: '19',
        monthTwo: ''
      }
    }
    const result = await check(options)
    expect(result).toBeFalsy()
  })
})
