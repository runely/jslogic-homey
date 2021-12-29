const check = require('../../handlers/conditions/date_before_date')
const mockOptions = require('../lib/mock-options')

describe('Return true when', () => {
  test('"dateOne" is before "dateTwo"', async () => {
    const options = {
      ...mockOptions,
      args: {
        dateOne: '01.09.2021',
        dateTwo: '01.10.2021'
      }
    }
    const result = await check(options)
    expect(result).toBe(true)
  })
})

describe('Return false when', () => {
  test('"dateOne" is equal to "dateTwo"', async () => {
    const options = {
      ...mockOptions,
      args: {
        dateOne: '01.09.2021',
        dateTwo: '01.09.2021'
      }
    }
    const result = await check(options)
    expect(result).toBe(false)
  })

  test('"dateOne" is after "dateTwo"', async () => {
    const options = {
      ...mockOptions,
      args: {
        dateOne: '01.10.2021',
        dateTwo: '01.09.2021'
      }
    }
    const result = await check(options)
    expect(result).toBe(false)
  })

  test('"dateOne" is missing', async () => {
    const options = {
      ...mockOptions,
      args: {
        dateTwo: '01.09.2021'
      }
    }
    const result = await check(options)
    expect(result).toBe(false)
  })

  test('"dateTwo" is missing', async () => {
    const options = {
      ...mockOptions,
      args: {
        dateOne: '01.09.2021'
      }
    }
    const result = await check(options)
    expect(result).toBe(false)
  })

  test('"dateOne" is an empty string', async () => {
    const options = {
      ...mockOptions,
      args: {
        dateOne: '',
        dateTwo: '01.10.2021'
      }
    }
    const result = await check(options)
    expect(result).toBe(false)
  })

  test('"dateTwo" is an empty string', async () => {
    const options = {
      ...mockOptions,
      args: {
        dateOne: '01.09.2021',
        dateTwo: ''
      }
    }
    const result = await check(options)
    expect(result).toBe(false)
  })
})
