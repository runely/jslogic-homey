import hasData from '../../lib/has-data';
import type { MockTriggerCardOptions } from '../../types/tests.types';
import type { TriggerCardArgs, TriggerCardOptions, TriggerCardState } from '../../types/types';

export default (options: TriggerCardOptions | MockTriggerCardOptions): boolean => {
  const { app } = options;
  const { date: argsDate, month: argsMonth } = options.args as TriggerCardArgs;
  const { date: stateDate, month: stateMonth } = options.state as TriggerCardState;

  if (argsDate === undefined || !hasData<number>(argsDate) || argsMonth === undefined || !hasData<string>(argsMonth)) {
    app.logError("date_month_becomes: 'args.date' and/or 'args.month' is missing");
    throw new Error("'date' and/or 'month' is missing");
  }

  if (
    stateDate === undefined ||
    !hasData<number>(stateDate) ||
    stateMonth === undefined ||
    !hasData<string>(stateMonth)
  ) {
    app.logError("date_month_becomes: 'state.date' and/or 'state.month' is missing");
    throw new Error("'date' and/or 'month' is missing from state");
  }

  const result = argsDate === stateDate && argsMonth === stateMonth;
  app.log(
    `date_month_becomes: Is ${argsDate} === ${stateDate} && ${argsMonth} === ${stateMonth} ?? ${result.toString()}`
  );
  return result;
};
