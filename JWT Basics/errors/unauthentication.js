//all the unauthenticated request will be handle by this class which extend
// the Custom api module which extend the Error class.

const CustomAPIError = require('./custom-error')

const {StatusCodes} = require('http-status-codes')
class UnauthenticatedError extends CustomAPIError {
    constructor(message) {
      super(message)
      // this.statusCode = statusCode
      this.statusCode = StatusCodes.UNAUTHORIZED
    }
  }
  
  module.exports = UnauthenticatedError
  