import { ConditionCardArgs, ConditionCardOptions } from '../../types/types';
import { MockConditionCardOptions } from '../../types/tests.types';

import hasData from '../../lib/has-data';

export default async (options: ConditionCardOptions | MockConditionCardOptions): Promise<boolean> => {
  const { app } = options;
  const { array, casesenitive, value } = options.args as ConditionCardArgs;

  if (array === undefined || !hasData<string>(array) || value === undefined || !hasData<string>(value) ||
    casesenitive === undefined || !hasData<string>(casesenitive)) {
    app.logError('value_contains_array: Argument \'array\' or \'value\' or \'casesenitive\' missing...');
    return false;
  }

  const arraySplit: string[] = array.split(';');
  const caseSensitive: boolean = casesenitive === 'true';
  const actualValue: string = caseSensitive ? value.trim() : value.trim().toLowerCase();

  app.log('value_contains_array: Case sensitive:', caseSensitive);
  app.log('value_contains_array: Array items:', arraySplit);
  app.log('value_contains_array: Value:', actualValue);

  const result: boolean = arraySplit.some(item => {
    const arrayItem = !caseSensitive ? item.toLowerCase() : item;
    return actualValue.includes(arrayItem);
  });

  app.log('value_contains_array: Value contains one of:', result);
  return result;
};
