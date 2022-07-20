const check = require('../../handlers/triggers/date_month_becomes')

const mockOptions = {
  args: {},
  state: {},
  app: {
    log: console.log
  }
}

describe('Return false when', () => {
  test('"args.date" is missing', () => {
    const options = {
      ...mockOptions,
      args: {
        month: 6
      },
      state: {
        date: 20,
        month: 6
      }
    }

    expect(check(options)).toBeFalsy()
  })

  test('"args.month" is missing', () => {
    const options = {
      ...mockOptions,
      args: {
        date: 20
      },
      state: {
        date: 20,
        month: 6
      }
    }

    expect(check(options)).toBeFalsy()
  })

  test('"state.date" is missing', () => {
    const options = {
      ...mockOptions,
      args: {
        date: 20,
        month: 6
      },
      state: {
        month: 6
      }
    }

    expect(check(options)).toBeFalsy()
  })

  test('"state.month" is missing', () => {
    const options = {
      ...mockOptions,
      args: {
        date: 20,
        month: 6
      },
      state: {
        date: 20
      }
    }

    expect(check(options)).toBeFalsy()
  })

  test('state and args is not a match', () => {
    const options = {
      ...mockOptions,
      args: {
        date: 20,
        month: 6
      },
      state: {
        date: 19,
        month: 6
      }
    }

    expect(check(options)).toBeFalsy()
  })
})

describe('Return true when', () => {
  test('state and args is a match', () => {
    const options = {
      ...mockOptions,
      args: {
        date: 20,
        month: 6
      },
      state: {
        date: 20,
        month: 6
      }
    }

    expect(check(options)).toBeTruthy()
  })

  test('state and args is a match even though args is strings', () => {
    const options = {
      ...mockOptions,
      args: {
        date: '20',
        month: '6'
      },
      state: {
        date: 20,
        month: 6
      }
    }

    expect(check(options)).toBeTruthy()
  })
})
