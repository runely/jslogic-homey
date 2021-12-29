const check = require('../../handlers/conditions/datetime_before_datetime')
const mockOptions = require('../lib/mock-options')

describe('Return true when', () => {
  test('"dateTimeOne" is before "dateTimeTwo"', async () => {
    const options = {
      ...mockOptions,
      args: {
        dateTimeOne: '01.09.2021 08:30',
        dateTimeTwo: '01.09.2021 09:00'
      }
    }
    const result = await check(options)
    expect(result).toBe(true)
  })
})

describe('Return false when', () => {
  test('"dateTimeOne" is equal to "dateTimeTwo"', async () => {
    const options = {
      ...mockOptions,
      args: {
        dateTimeOne: '01.09.2021 08:30',
        dateTimeTwo: '01.09.2021 08:30'
      }
    }
    const result = await check(options)
    expect(result).toBe(false)
  })

  test('"dateTimeOne" is after "dateTimeTwo"', async () => {
    const options = {
      ...mockOptions,
      args: {
        dateTimeOne: '01.09.2021 09:00',
        dateTimeTwo: '01.09.2021 08:30'
      }
    }
    const result = await check(options)
    expect(result).toBe(false)
  })

  test('"dateTimeOne" is missing', async () => {
    const options = {
      ...mockOptions,
      args: {
        dateTimeTwo: '01.09.2021 09:00'
      }
    }
    const result = await check(options)
    expect(result).toBe(false)
  })

  test('"dateTimeTwo" is missing', async () => {
    const options = {
      ...mockOptions,
      args: {
        dateTimeOne: '01.09.2021 08:30'
      }
    }
    const result = await check(options)
    expect(result).toBe(false)
  })

  test('"dateTimeOne" is an empty string', async () => {
    const options = {
      ...mockOptions,
      args: {
        dateTimeOne: '',
        dateTimeTwo: '01.10.2021 09:00'
      }
    }
    const result = await check(options)
    expect(result).toBe(false)
  })

  test('"dateTimeTwo" is an empty string', async () => {
    const options = {
      ...mockOptions,
      args: {
        dateTimeOne: '01.09.2021 08:30',
        dateTimeTwo: ''
      }
    }
    const result = await check(options)
    expect(result).toBe(false)
  })
})
