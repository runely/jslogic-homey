const check = require('../../handlers/conditions/time_before_time')
const mockOptions = require('../lib/mock-options')

describe('Return true when', () => {
  test('"timeOne" is before "timeTwo"', async () => {
    const options = {
      ...mockOptions,
      args: {
        timeOne: '08:30',
        timeTwo: '09:00'
      }
    }
    const result = await check(options)
    expect(result).toBeTruthy()
  })
})

describe('Return false when', () => {
  test('"timeOne" is equal to "timeTwo"', async () => {
    const options = {
      ...mockOptions,
      args: {
        timeOne: '08:30',
        timeTwo: '08:30'
      }
    }
    const result = await check(options)
    expect(result).toBeFalsy()
  })

  test('"timeOne" is after "timeTwo"', async () => {
    const options = {
      ...mockOptions,
      args: {
        timeOne: '09:00',
        timeTwo: '08:30'
      }
    }
    const result = await check(options)
    expect(result).toBeFalsy()
  })

  test('"timeOne" is missing', async () => {
    const options = {
      ...mockOptions,
      args: {
        timeTwo: '09:00'
      }
    }
    const result = await check(options)
    expect(result).toBeFalsy()
  })

  test('"timeTwo" is missing', async () => {
    const options = {
      ...mockOptions,
      args: {
        timeOne: '08:30'
      }
    }
    const result = await check(options)
    expect(result).toBeFalsy()
  })

  test('"timeOne" is an empty string', async () => {
    const options = {
      ...mockOptions,
      args: {
        timeOne: '',
        timeTwo: '09:00'
      }
    }
    const result = await check(options)
    expect(result).toBeFalsy()
  })

  test('"timeTwo" is an empty string', async () => {
    const options = {
      ...mockOptions,
      args: {
        timeOne: '08:30',
        timeTwo: ''
      }
    }
    const result = await check(options)
    expect(result).toBeFalsy()
  })
})
