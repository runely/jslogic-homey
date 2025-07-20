/** @type {import('jest').Config} */
module.exports = {
  modulePathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/.homeybuild/'
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/tests/**/*test.ts?(x)',
    '**/?(*.)+.(spec|test).ts?(x)'
  ]
}
