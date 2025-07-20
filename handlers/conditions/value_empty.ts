import { ConditionCardOptions } from "../../types/types";
import { MockConditionCardOptions } from "../../types/tests.types";

export default async (options: ConditionCardOptions | MockConditionCardOptions): Promise<boolean> => {
  const { args, app } = options

  if (typeof args.value !== 'string') {
    app.logError('value_empty: Argument \'value\' missing...')
    return false
  }

  app.log('value_empty: Value:', args.value)
  const result = args.value === '' || args.value === ' '
  app.log('value_empty: Is value undefined, empty or one whitespace:', result)
  return result
}
