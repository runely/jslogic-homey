module.exports = async options => {
  const { app } = options

  const random = Math.random()
  const result = random > 0.5
  app.log(`is_random_true_false: ${random} > 0.5 == ${result}`)
  return result
}
