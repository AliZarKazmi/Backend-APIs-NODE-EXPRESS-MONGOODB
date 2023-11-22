const mongoose =  require('mongoose')

const JobSchema = new mongoose.Schema({
    company :{
        type:String,
        required: [true,'Please provide company name'],
        maxlength : 50,
    },

    position:{
        type:String,
        required :[true, 'Please provide position'],
        maxlength:100
    },

    status :{
        type: String,
        enum :['interview','declined','pending'],
        default:'pending'
    },

    //We are basically tieing the job posts to that specific user , by defing the following code
    //i.e every job post is associated with the user , so we have to assign the post details to specific user 
    createdBy :{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:[true,'Please provide the user']
    }
},
    {timestamps: true}
    )

    module.exports = mongoose.model('Job',JobSchema)
