const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");


//get method , retriving all the data 
// And Example of using asyncWrapper Concept
const getAllTask = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

// const getAllTask =  async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     res.status(200).json({ data: tasks });
    
//   } catch (error) {
//     res.status(500).json({msg:err})
//   }
// };







//post method
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

//get single item by id
const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }

  res.status(200).json({ task });
});


//find the item and delete
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  
    //ways to send response in delete case as no Data is thorwn on frontend 
    // Method 1: res.status(200).send()
    
    //Method 2
    //res.status(200).json({task:null,status:'success'})
    
  // The following code is for testing to check wether the data is deleted or not  
  res.status(200).json({ task });
});


//modify the single data
const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }

  res.status(200).json({ task });
});


module.exports = {
  getAllTask,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
