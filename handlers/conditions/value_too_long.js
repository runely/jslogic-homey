module.exports = async options => {
  const { args, app } = options

  if (!args.maxLength || !args.value) return false

  const value = args.value.trim()
  app.log('value_too_long: Value:', value)
  app.log('value_too_long: Length:', value.length)
  app.log('value_too_long: MaxLength:', args.maxLength)
  const result = value.length < args.maxLength
  app.log('value_too_long: Is value length too long:', result)
  return result
}
