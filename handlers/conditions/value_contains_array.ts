import hasData from '../../lib/has-data';
import type { MockConditionCardOptions } from '../../types/tests.types';
import type { ConditionCardArgs, ConditionCardOptions } from '../../types/types';

export default (options: ConditionCardOptions | MockConditionCardOptions): boolean => {
  const { app } = options;
  const { array, casesenitive, value } = options.args as ConditionCardArgs;

  if (
    array === undefined ||
    !hasData<string>(array) ||
    value === undefined ||
    !hasData<string>(value) ||
    casesenitive === undefined ||
    !hasData<string>(casesenitive)
  ) {
    app.logError("value_contains_array: Argument 'array' and/or 'value' missing...");
    throw new Error("'array' and/or 'value' is missing");
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
