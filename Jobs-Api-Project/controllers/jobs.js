const jobModel = require("../models/Job")
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors')


const getAllJobs = async(req,res)=>{
    res.send('Get all jobs')
}

const getJob = async(req,res)=>{
    res.send('Get Single job')
}

const createJob = async(req,res)=>{
    console.log(req.body)
    //creating a new property on req.body i.e "createdBy" -> this name should be same as we defined in Job models
    req.body.createdBy = req.user.userId
    
    console.log(req.body)
    const job =  await jobModel.create(req.body) 
    res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async(req,res)=>{
    res.send('Update the job')
}

const deleteJob = async(req,res)=>{
    res.send('Delete the job')
}

module.exports = {
    getAllJobs:getAllJobs,
    getJob:getJob,
    createJob:createJob,
    updateJob:updateJob,
    deleteJob:deleteJob
    
}



