//all the bad request will be handle by this class which extend the Custom api module 
//which extend the Error class.

const CustomAPIError = require('./custom-error')

const {StatusCodes} = require('http-status-codes')
class BadRequest extends CustomAPIError {
    constructor(message) {
      super(message)
      // this.statusCode = statusCode
      this.statusCode = StatusCodes.BAD_REQUEST
    }
  }
  
  module.exports = BadRequest
  