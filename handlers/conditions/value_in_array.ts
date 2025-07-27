import { ConditionCardArgs, ConditionCardOptions } from '../../types/types';
import { MockConditionCardOptions } from '../../types/tests.types';

import hasData from '../../lib/has-data';

export default (options: ConditionCardOptions | MockConditionCardOptions): boolean => {
  const { app } = options;
  const { array, casesenitive, value } = options.args as ConditionCardArgs;

  if (array === undefined || !hasData<string>(array) || value === undefined || !hasData<string>(value)) {
    app.logError('value_in_array: Argument \'array\' and/or \'value\' missing...');
    return false;
  }

  const arraySplit: string[] = array.split(';');
  const caseSensitive: boolean = casesenitive === 'true';
  const actualValue = caseSensitive ? value.trim() : value.trim().toLowerCase();

  app.log('value_in_array: Array items:', arraySplit);
  app.log('value_in_array: Case sensitive:', caseSensitive);
  app.log('value_in_array: Value:', actualValue);

  const result: boolean = arraySplit.some(item => {
    const arrayItem = !caseSensitive ? item.toLowerCase() : item;
    return arrayItem === actualValue;
  });
  app.log('value_in_array: Is value in array:', result);

  return result;
};
