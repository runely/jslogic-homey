module.exports = async options => {
  const { args, app } = options

  if (typeof args.value !== 'string') {
    app.log('value_empty: Argument \'value\' missing...')
    return false
  }

  app.log('value_empty: Value:', args.value)
  const result = args.value === '' || args.value === ' '
  app.log('value_empty: Is value undefined, empty or one whitespace:', result)
  return result
}
