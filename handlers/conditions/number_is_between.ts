import { ConditionCardOptions } from "../../types/types";
import { MockConditionCardOptions } from "../../types/tests.types";

export default async (options: ConditionCardOptions | MockConditionCardOptions): Promise<boolean> => {
  const { args, app } = options
  const value1 = Number(args.value1)
  const value2 = Number(args.value2)
  const value3 = Number(args.value3)
  const includes: string = args.includes

  if (value1 === undefined || value2 === undefined || value3 === undefined || includes === undefined) {
    app.logError('number_is_between: Argument \'value1\' or \'value2\' or \'value3\' or \'includes\' missing...')
    return false
  }

  return includes.toLowerCase() === 'true'
    ? value1 >= value2 && value1 <= value3
    : value1 > value2 && value1 < value3
}
