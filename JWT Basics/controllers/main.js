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

const {BadRequestError} = require("../errors");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  //check/validation in the controller
  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  //creating JWT tokken

  //just for demo , normally provided by DB!!!!
  const id = new Date().getDate();

  //try to keep your payload small, better experience for user
  //first parameter is payload where we pass anything except the confidential data like password etc,
  //second parameter is "jwt secrect"
  // Note in production your "JWT_SECURITY" value should be long, complex and unguessable string value!!
  const token = jwt.sign({ id, username }, process.env.JWT_SECURITY, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });

  //   console.log(username, password);
  //   res.send("Fake Login/Register/SignUp Route");
};

const dashboard = async (req, res) => {
  //this data is coming from the middleware
  console.log(req.user);

  const luckyNumber = Math.floor(Math.random() * 100);

  //providing the dynamic username , across their token as token have the user data
  res.status(200).json({
    msg: `${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
