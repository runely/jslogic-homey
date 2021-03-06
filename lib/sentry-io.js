'use strict'

const pkg = require('../app.json')
const pkgName = pkg.name.en
const pkgVersion = pkg.version
const sentryDsn = pkg.sentry.dsn
const sentryTraceSampleRate = pkg.sentry.traceSampleRate
const sentryEnv = pkg.sentry.environment

const sentry = require('@sentry/node')

const init = homey => {
  sentry.init({
    dsn: sentryDsn,
    release: `${pkgName}@${pkgVersion}`,
    // We recommend adjusting this value in production, or using tracesSampler for finer control
    tracesSampleRate: sentryTraceSampleRate,
    environment: sentryEnv
  })

  if (homey) {
    // additional tags
    if (homey.version) {
      sentry.setTag('firmware', homey.version)
    }

    if (homey.i18n._language) {
      sentry.setTag('language', homey.i18n._language)
    }

    // add homey id
    homey.cloud.getHomeyId()
      .then(homeyId => sentry.setUser({ id: homeyId }))
      .catch(error => console.error('Failed to get homey ID:', error))
  }
}

const startTransaction = (op = 'transactionRun', name = pkgName) => {
  return sentry.startTransaction({
    op,
    name
  })
}

module.exports.sentry = sentry
module.exports.init = init
module.exports.startTransaction = startTransaction
