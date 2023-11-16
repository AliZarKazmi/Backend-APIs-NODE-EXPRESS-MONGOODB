//This module extend the Error class in which the errors and the request status
//will be sent by this class


class CustomAPIError extends Error {
   
  // constructor(message,status) {
  constructor(message) {

    super(message)
    // this.statusCode = statusCode
  }
}

module.exports = CustomAPIError
