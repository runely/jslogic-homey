import type { MockConditionCardOptions } from '../../types/tests.types';
import type { ConditionCardArgs, ConditionCardOptions } from '../../types/types';

export default (options: ConditionCardOptions | MockConditionCardOptions): boolean => {
  const { app } = options;
  const { value } = options.args as ConditionCardArgs;

  if (value === undefined) {
    app.logError("value_empty: Argument 'value' missing...");
    throw new Error("'value' is missing");
  }

  app.log(`value_empty: Value: '${value}'`);
  const result = value.trim() === '';
  app.log('value_empty: Is value empty or whitespace:', result);
  return result;
};
