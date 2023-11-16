/** */

//check username and password in post(login) request
//if both exist then create new JWT
//send back to front-end

//setup authentication so only the request with JWT can be access the dashboard

/** */

/** */
// 3 ways for server side validation
// Mongoose validaiton
// Joi package
// checks in the controller
/** */

//"Payload" basically contains the data of the user i.e id, name , email etc

const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  console.log(req.headers);
  console.log(req.headers.authentication);
  //getting the token from the header
  const authHeader = req.headers.authorization;

  //token validation checks i.e if token does not exist or the Synatx/format is different
  //in our case the format of token is that it must start with "Bearer with a single space"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token Provided", 401);
  }

  //we are extracting only the token for that we split in on bases of a 'single space'
  //accessing the token value from the 1 index as on 0 there is 'Bearer'
  const token = authHeader.split(" ")[1];
  console.log(token);

  //verifying token
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECURITY);
    console.log(decodedToken);

    /**** */
    //Following are not the part of middleware but a controller part
    /**** */
    //   const luckyNumber = Math.floor(Math.random() * 100);
    //providing the dynamic username , across their token as token have the user data
    //   res.status(200).json({
    //     msg: `${decodedToken.username}`,
    //     secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    //   });

    const { id, username } = decodedToken;
    req.user = { id, username };
    next();
  } catch (err) {
    throw new CustomAPIError(
      "Invalid Token! Not authorized to access this route",
      401
    );
  }
};

module.exports = authenticationMiddleware;
