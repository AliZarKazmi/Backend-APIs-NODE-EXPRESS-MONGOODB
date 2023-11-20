const getAllJobs = async(req,res)=>{
    res.send('Get all jobs')
}

const getJob = async(req,res)=>{
    res.send('Get Single job')
}

const createJob = async(req,res)=>{
    res.send('Create job')
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



