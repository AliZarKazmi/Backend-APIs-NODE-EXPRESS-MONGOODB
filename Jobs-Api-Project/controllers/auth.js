const userModel = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")


const register = async(req,res)=>{
    
    //FOR THE TIME BEING I want to do mongoo my validation , that's why I am passing 
    //{...req.body}
    const user = await userModel.create({...req.body})

    //we invoke the instance mongoose function from the {User.js->models} which we have created customly
    const token = user.createJWT()

    // creating json web token i.e jwt -> [ this is going to be achived by mongoose instead function ]
    // const token = jwt.sign({userId:user._id, name: user.name},'jwtSecret',{expiresIn:'30d'})

    //instead of sending user data, we send back the token or userName, just like below 
    res
    .status(StatusCodes.CREATED)
    .json({user: {name:user.name} ,token})
    // .json({user: {name:user.getName()} ,token}) //using schema instance method to get the name



    /** */
    //Hashing Method #1 

    // const {name,email,password} = req.body

        //converting the password into the hash password
    // const salt = await bcrypt.genSalt(10)//this generate random bites 
    // const hashedPassword = await bcrypt.hash(password,salt)
    // const tempUser = {name,email, password:hashedPassword}
/** */

}

const login = async(req,res)=>{

    const {email,password} = req.body;
    if(!email || !password){
       throw new BadRequestError("Please provide email and password")
    }
    const user = await userModel.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')       
    }
    
    //instance mongoose function call
    const isPasswordCorrect = await user.checkPassword(password)
  
    //compare password
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials')       
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{name:user.name},token})
    res.send('login user')
}

module.exports = {
    register,
    login
}