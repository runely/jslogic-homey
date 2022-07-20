'use strict'

module.exports = options => {
  const { args, state, app } = options

  if (!args.date || !args.month) {
    app.log('date_month_becomes: "args.date" and/or "args.month" is missing')
    return false
  }
  if (!state.date || !state.month) {
    app.log('date_month_becomes: "state.date" and/or "state.month" is missing')
    return false
  }

  const result = Number.parseInt(args.date) === Number.parseInt(state.date) && Number.parseInt(args.month) === Number.parseInt(state.month)
  app.log(`date_month_becomes: Is ${args.date} === ${state.date} && ${args.month} === ${state.month} ?? ${result}`)
  return result
}
