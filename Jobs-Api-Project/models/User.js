const mongoose =require('mongoose')

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
        trim:true,
        lowercase:true,
        required:[true, "Please provide the Password"],
        minlength:6,
        maxlength:12
    }
})

module.exports = mongoose.model('User',UserSchema)