const check = require('../../handlers/conditions/daynum_between_daynum')
const mockOptions = require('../lib/mock-options')

describe('Return true when', () => {
  test('Day is after "dayOne" this month and before "dayTwo" this month', async () => {
    const options = {
      ...mockOptions,
      args: {
        dayOne: 21,
        dayTwo: 28
      },
      day: 25
    }
    const result = await check(options)
    expect(result).toBeTruthy()
  })

  test('Day is before "dayOne" this month and before "dayTwo" this month', async () => {
    const options = {
      ...mockOptions,
      args: {
        dayOne: 28,
        dayTwo: 15
      },
      day: 10
    }
    const result = await check(options)
    expect(result).toBeTruthy()
  })
})

describe('Return false when', () => {
  test('Day is before "dayOne" and before "dayTwo"', async () => {
    const options = {
      ...mockOptions,
      args: {
        dayOne: 19,
        dayTwo: 20
      },
      day: 10
    }
    const result = await check(options)
    expect(result).toBeFalsy()
  })

  test('"dayOne" is missing', async () => {
    const options = {
      ...mockOptions,
      args: {
        dayTwo: 20
      }
    }
    const result = await check(options)
    expect(result).toBeFalsy()
  })

  test('"dayTwo" is missing', async () => {
    const options = {
      ...mockOptions,
      args: {
        dayOne: 19
      }
    }
    const result = await check(options)
    expect(result).toBeFalsy()
  })
})
