const mongoose =require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        lowercase:true,
        required:[true, "Please provide the name"],
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        required:[true, "Please provide the Email"],
       
        //instead of Regex express can also use some npm package 
        // like 'validator package' which checks the enter email contains the correct format or not
        //but for the time being we are using regex expressiom
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'Please provide valid email'],

    unique:true
    },
    password:{
        type:String,
        // trim:true,
        // lowercase:true,
        required:[true, "Please provide the Password"],
        minlength:6,
    }
})


/** */
    
    //Hashing Method # 2 (Mthod 1 is in the "auth.js->controller") 

    //Note :
        //We are hashing the password using the "Mongoose middleware "

        //before storing password as a String we need to store it as a HashString Password
        //it works like a middleware 

/** */

//Encrypting Password 
UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
})


//Instance Method-> it is like creating a custom function in mongoose
// UserSchema.methods.getName = function(){
//     return this.name
// } 

//defining a function which generate token 
UserSchema.methods.createJWT = function(){
    return jwt.sign({userId:this._id, name :this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}


//Decrypting Password / Compairing Password 
UserSchema.methods.checkPassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password)
    return isMatch

}
module.exports = mongoose.model('User',UserSchema)