'use strict'

const Homey = require('homey')

const pkgName = Homey.manifest.name.en
const pkgVersion = Homey.manifest.version

const sentry = require('@sentry/node')

const init = homey => {
  sentry.init({
    dsn: Homey.env.SENTRY_DSN,
    release: `${pkgName}@${pkgVersion}`,
    // We recommend adjusting this value in production, or using tracesSampler for finer control
    tracesSampleRate: Number(Homey.env.SENTRY_TRACE_SAMPLE_RATE),
    environment: Homey.env.SENTRY_ENV
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
