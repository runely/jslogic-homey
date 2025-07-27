import { ConditionCardArgs, ConditionCardOptions } from '../../types/types';
import { MockConditionCardOptions } from '../../types/tests.types';

import hasData from "../../lib/has-data";

export default (options: ConditionCardOptions | MockConditionCardOptions): boolean => {
  const { app } = options;
  const { maxLength, value } = options.args as ConditionCardArgs;

  if (maxLength === undefined || !hasData<number>(maxLength) || value === undefined || !hasData<string>(value)) {
    app.logError('value_too_long: Argument \'maxLength\' or \'value\' missing...');
    return false;
  }

  const actualValue: string = value.trim();
  app.log('value_too_long: Value:', actualValue);
  app.log('value_too_long: Length:', actualValue.length);
  app.log('value_too_long: MaxLength:', maxLength);

  const result: boolean = actualValue.length < maxLength;
  app.log('value_too_long: Is value length shorter than maxLength:', result);
  return result;
};
