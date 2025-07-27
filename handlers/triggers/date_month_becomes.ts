import { MockTriggerCardOptions } from '../../types/tests.types';
import { TriggerCardArgs, TriggerCardOptions, TriggerCardState } from '../../types/types';

import hasData from '../../lib/has-data';

export default (options: TriggerCardOptions | MockTriggerCardOptions): boolean => {
  const { app } = options;
  const { date: argsDate, month: argsMonth } = options.args as TriggerCardArgs;
  const { date: stateDate, month: stateMonth } = options.state as TriggerCardState;

  if (argsDate === undefined || !hasData<number>(argsDate) || argsMonth === undefined || !hasData<string>(argsMonth)) {
    app.logError('date_month_becomes: "args.date" and/or "args.month" is missing');
    return false;
  }

  if (stateDate === undefined || !hasData<number>(stateDate) || stateMonth === undefined || !hasData<string>(stateMonth)) {
    app.logError('date_month_becomes: "state.date" and/or "state.month" is missing');
    return false;
  }

  const result = argsDate === stateDate && argsMonth === stateMonth;
  app.log(`date_month_becomes: Is ${argsDate} === ${stateDate} && ${argsMonth} === ${stateMonth} ?? ${result.toString()}`);
  return result;
};
