// As we were using try-catch redudently in the controller so to overcome this we 
// are building that AsyncWrapper middleware.
//There are also npm packages which are used for that
//But this is for just basic understanding
const asyncWrapper = (fn) => {
    return async (req, res, next) => {
      try {
        await fn(req, res, next)
      } catch (error) {
        next(error)
      }
    }
  }
  
  module.exports = asyncWrapper
  