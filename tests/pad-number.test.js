const pad = require('../lib/pad-number')

test('Number higher than 10 is not padded', () => {
  expect(pad(12)).toBe(12)
})

test('Number 10 is not padded', () => {
  expect(pad(10)).toBe(10)
})

test('Number lower than 10 is padded', () => {
  expect(pad(8)).toBe('08')
})

test('Numbertext higher than 10 is not padded', () => {
  expect(pad('12')).toBe('12')
})

test('Numbertext 10 is not padded', () => {
  expect(pad('10')).toBe('10')
})

test('Numbertext lower than 10 (one digit) is padded', () => {
  expect(pad('8')).toBe('08')
})

test('Numbertext lower than 10 (two digits) is not padded', () => {
  expect(pad('08')).toBe('08')
})
