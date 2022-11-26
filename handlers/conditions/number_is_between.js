module.exports = async options => {
  const { args } = options
  const { value1, value2, value3, includes } = args

  if (value1 === undefined || value2 === undefined || value3 === undefined || includes === undefined) return false

  return includes.toLowerCase() === 'true' ? (value1 >= value2 && value1 <= value3) : (value1 > value2 && value1 < value3)
}
