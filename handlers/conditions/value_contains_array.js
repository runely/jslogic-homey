module.exports = async options => {
  const { args, app } = options

  if (!args.array || !args.value) {
    app.log('value_contains_array: Argument \'array\' or \'value\' missing...')
    return false
  }

  const array = args.array.split(';')
  const caseSensitive = args.casesenitive === 'true'
  let value = typeof args.value === 'string' ? args.value.trim() : args.value

  if (!caseSensitive) {
    value = value.toLowerCase()
  }

  app.log('value_contains_array: Case sensitive:', caseSensitive)
  app.log('value_contains_array: Array items:', array)
  app.log('value_contains_array: Value:', value)

  const result = array.some(item => {
    const arrayItem = !caseSensitive ? item.toLowerCase() : item
    return value.includes(arrayItem)
  })
  app.log('value_contains_array: Value contains one of:', result)
  return result
}
