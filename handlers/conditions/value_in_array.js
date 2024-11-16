module.exports = async options => {
  const { args, app } = options

  if (!args.array || !args.value) {
    return false
  }

  const array = args.array.split(';')
  const caseSensitive = args.casesenitive === 'true'
  let value = typeof args.value === 'string' ? args.value.trim() : args.value

  if (!caseSensitive) {
    value = value.toLowerCase()
  }

  app.log('value_in_array: Array items:', array)
  app.log('value_in_array: Case sensitive:', caseSensitive)
  app.log('value_in_array: Value:', value)

  const result = array.some(item => {
    const arrayItem = !caseSensitive ? item.toLowerCase() : item
    return arrayItem === value
  })
  app.log('value_in_array: Is value in array:', result)

  return result
}
