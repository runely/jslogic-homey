import { ConditionCardOptions } from "../../types/types";
import { MockConditionCardOptions } from "../../types/tests.types";

export default async (options: ConditionCardOptions | MockConditionCardOptions): Promise<boolean> => {
  const { args, app } = options

  if (!args || !args.maxLength || !args.value) {
    app.logError('value_too_long: Argument \'maxLength\' or \'value\' missing...')
    return false
  }

  const value: string = args.value.trim()
  app.log('value_too_long: Value:', value)
  app.log('value_too_long: Length:', value.length)
  app.log('value_too_long: MaxLength:', args.maxLength)

  const result: boolean = value.length < args.maxLength
  app.log('value_too_long: Is value length shorter than maxLength:', result)
  return result
}
