import { ConditionCardArgs, ConditionCardOptions } from '../../types/types';
import { MockConditionCardOptions } from '../../types/tests.types';

export default (options: ConditionCardOptions | MockConditionCardOptions): boolean => {
  const { app } = options;
  const { value } = options.args as ConditionCardArgs;

  if (value === undefined) {
    app.logError('value_empty: Argument \'value\' missing...');
    return false;
  }

  app.log(`value_empty: Value: '${value}'`);
  const result = value.trim() === '';
  app.log('value_empty: Is value empty or whitespace:', result);
  return result;
};
