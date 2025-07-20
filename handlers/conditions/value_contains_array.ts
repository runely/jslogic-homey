import { ConditionCardOptions } from "../../types/types";
import { MockConditionCardOptions } from "../../types/tests.types";

export default async (options: ConditionCardOptions | MockConditionCardOptions): Promise<boolean> => {
  const { args, app } = options

  if (!args || !args.array || !args.value) {
    app.logError('value_contains_array: Argument \'array\' or \'value\' missing...')
    return false
  }

  const array: string[] = args.array.split(';')
  const caseSensitive: boolean = args.casesenitive === 'true'
  const value: string = caseSensitive ? args.value.trim() : args.value.trim().toLowerCase()

  app.log('value_contains_array: Case sensitive:', caseSensitive)
  app.log('value_contains_array: Array items:', array)
  app.log('value_contains_array: Value:', value)

  const result: boolean = array.some(item => {
    const arrayItem = !caseSensitive ? item.toLowerCase() : item
    return value.includes(arrayItem)
  })

  app.log('value_contains_array: Value contains one of:', result)
  return result
}
