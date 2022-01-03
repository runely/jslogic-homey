const check = require('../../handlers/conditions/weekday_one_of')
const mockOptions = require('../lib/mock-options')
const { weekdays } = require('../../locales/en.json')

mockOptions.app.__ = setting => {
  const name = setting.split('.')[1]
  return weekdays[name]
}

const weekdayStrings = Object.values(weekdays)

describe('Return true when', () => {
  weekdayStrings.forEach((weekday, index) => {
    test(`"Weekday" is ${weekday} and ${weekday} is one of the selected weekdays`, async () => {
      const options = {
        ...mockOptions,
        args: {
          weekdays: weekdayStrings.join(';')
        },
        day: index + 1
      }
      const result = await check(options)
      expect(result).toBe(true)
    })
  })

  test('"Weekday" is Monday and Monday is the only selected weekday', async () => {
    const options = {
      ...mockOptions,
      args: {
        weekdays: ['Monday'].join(';')
      },
      day: 1
    }
    const result = await check(options)
    expect(result).toBe(true)
  })

  test('"Weekday" is Tuesday and Monday and Tuesday is the only selected weekdays', async () => {
    const options = {
      ...mockOptions,
      args: {
        weekdays: ['Monday', 'Tuesday'].join(';')
      },
      day: 2
    }
    const result = await check(options)
    expect(result).toBe(true)
  })
})

describe('Return false when', () => {
  weekdayStrings.forEach((weekday, index) => {
    test(`"Weekday" is ${weekday} and ${weekday} is NOT one of the selected weekdays`, async () => {
      const options = {
        ...mockOptions,
        args: {
          weekdays: weekdayStrings.filter(w => w !== weekday).join(';')
        },
        day: index + 1
      }
      const result = await check(options)
      expect(result).toBe(false)
    })
  })

  test('"Weekday" is Monday and Tuesday is the only selected weekday', async () => {
    const options = {
      ...mockOptions,
      args: {
        weekdays: ['Tuesday'].join(';')
      },
      day: 1
    }
    const result = await check(options)
    expect(result).toBe(false)
  })

  test('"weekdays" is missing', async () => {
    const options = {
      ...mockOptions,
      args: {},
      day: 1
    }
    const result = await check(options)
    expect(result).toBe(false)
  })

  test('"weekdays" is an empty string', async () => {
    const options = {
      ...mockOptions,
      args: {
        weekdays: ''
      },
      day: 1
    }
    const result = await check(options)
    expect(result).toBe(false)
  })
})
