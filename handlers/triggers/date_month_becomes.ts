import { TriggerCardOptions } from "../../types/types";
import { MockTriggerCardOptions } from "../../types/tests.types";

export default (options: TriggerCardOptions | MockTriggerCardOptions): Promise<boolean> => {
  const { args, state, app } = options

  if (!args || !args.date || !args.month) {
    app.logError('date_month_becomes: "args.date" and/or "args.month" is missing')
    return Promise.resolve(false);
  }

  if (!state || !state.date || !state.month) {
    app.logError('date_month_becomes: "state.date" and/or "state.month" is missing')
    return Promise.resolve(false)
  }
  
  const argsDate = Number.parseInt(args.date)
  const argsMonth = Number.parseInt(args.month)
  const stateDate = Number.parseInt(state.date)
  const stateMonth = Number.parseInt(state.month)

  const result = argsDate === stateDate && argsMonth === stateMonth
  app.log(`date_month_becomes: Is ${argsDate} === ${stateDate} && ${argsMonth} === ${stateMonth} ?? ${result}`)
  return Promise.resolve(result)
}
