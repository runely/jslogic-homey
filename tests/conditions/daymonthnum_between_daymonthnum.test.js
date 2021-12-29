const check = require('../../handlers/conditions/daymonthnum_between_daymonthnum')
const mockOptions = require('../lib/mock-options')

describe('Return true when', () => {
  test('Today is after "dayMonthOne" this year and before "dayMonthTwo" next year', async () => {
    const options = {
      ...mockOptions,
      args: {
        dayOne: '28',
        monthOne: '11',
        dayTwo: '3',
        monthTwo: '0'
      },
      date: '2021-12-29T08:30:00'
    }
    const result = await check(options)
    expect(result).toBe(true)
  })

  test('Today is after "dayMonthOne" last year and before "dayMonthTwo" this year', async () => {
    const options = {
      ...mockOptions,
      args: {
        dayOne: '28',
        monthOne: '11',
        dayTwo: '3',
        monthTwo: '0'
      },
      date: '2022-01-02T08:30:00'
    }
    const result = await check(options)
    expect(result).toBe(true)
  })

  test('Today is after "dayMonthOne" and before "dayMonthTwo" inside same year', async () => {
    const options = {
      ...mockOptions,
      args: {
        dayOne: '19',
        monthOne: '11',
        dayTwo: '21',
        monthTwo: '11'
      },
      date: '2021-12-20T08:30:00'
    }
    const result = await check(options)
    expect(result).toBe(true)
  })

  test('Today is equal to "dayMonthOne" which is equal to "dayMonthTwo"', async () => {
    const options = {
      ...mockOptions,
      args: {
        dayOne: '19',
        monthOne: '11',
        dayTwo: '19',
        monthTwo: '11'
      },
      date: '2021-12-19T08:30:00'
    }
    const result = await check(options)
    expect(result).toBe(true)
  })
})

describe('Return false when', () => {
  test('Today is after "dayMonthOne" and "dayMonthTwo"', async () => {
    const options = {
      ...mockOptions,
      args: {
        dayOne: '19',
        monthOne: '11',
        dayTwo: '20',
        monthTwo: '11'
      },
      date: '2021-12-21T08:30:00'
    }
    const result = await check(options)
    expect(result).toBe(false)
  })

  test('Today is before "dayMonthOne" this year and before "dayMonthTwo" next year', async () => {
    const options = {
      ...mockOptions,
      args: {
        dayOne: '28',
        monthOne: '11',
        dayTwo: '31',
        monthTwo: '4'
      },
      date: '2022-06-30T08:30:00'
    }
    const result = await check(options)
    expect(result).toBe(false)
  })

  test('"dayOne" is missing', async () => {
    const options = {
      ...mockOptions,
      args: {
        monthOne: '11',
        dayTwo: '20',
        monthTwo: '11'
      }
    }
    const result = await check(options)
    expect(result).toBe(false)
  })

  test('"monthOne" is missing', async () => {
    const options = {
      ...mockOptions,
      args: {
        dayOne: '19',
        dayTwo: '20',
        monthTwo: '11'
      }
    }
    const result = await check(options)
    expect(result).toBe(false)
  })

  test('"dayTwo" is missing', async () => {
    const options = {
      ...mockOptions,
      args: {
        dayOne: '19',
        monthOne: '11',
        monthTwo: '11'
      }
    }
    const result = await check(options)
    expect(result).toBe(false)
  })

  test('"monthTwo" is missing', async () => {
    const options = {
      ...mockOptions,
      args: {
        dayOne: '19',
        monthOne: '11',
        dayTwo: '20'
      }
    }
    const result = await check(options)
    expect(result).toBe(false)
  })

  test('"dayOne" is an empty string', async () => {
    const options = {
      ...mockOptions,
      args: {
        dayOne: '',
        monthOne: '11',
        dayTwo: '20',
        monthTwo: '11'
      }
    }
    const result = await check(options)
    expect(result).toBe(false)
  })

  test('"monthOne" is an empty string', async () => {
    const options = {
      ...mockOptions,
      args: {
        dayOne: '19',
        monthOne: '',
        dayTwo: '20',
        monthTwo: '11'
      }
    }
    const result = await check(options)
    expect(result).toBe(false)
  })

  test('"dayTwo" is an empty string', async () => {
    const options = {
      ...mockOptions,
      args: {
        dayOne: '19',
        monthOne: '11',
        dayTwo: '',
        monthTwo: '11'
      }
    }
    const result = await check(options)
    expect(result).toBe(false)
  })

  test('"monthTwo" is an empty string', async () => {
    const options = {
      ...mockOptions,
      args: {
        dayOne: '19',
        monthOne: '11',
        dayTwo: '20',
        monthTwo: ''
      }
    }
    const result = await check(options)
    expect(result).toBe(false)
  })
})
