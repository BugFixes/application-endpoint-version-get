const bugfixes = require('bugfixes')
const ApplicationModel = require('bugfixes-application-models')
const Logs = require('bugfixes-account-logging')

const bugfunctions = bugfixes.functions

module.exports = (event, context, callback) => {
  let log = new Logs()
  log.action = 'Get Version'
  log.content = {
    apiKey: event.requestContext.identity.apiKey,
    pathParameters: event.pathParameters
  }

  let application = new ApplicationModel()
  application.accountId = event.pathParameters.accountId
  application.key = event.pathParameters.applicationKey
  application.getVersion((error, result) => {
    if (error) {
      return callback(null, bugfunctions.lambdaError(10000, error))
    }

    return callback(null, bugfunctions.lambdaResult(10001, result))
  })
}
