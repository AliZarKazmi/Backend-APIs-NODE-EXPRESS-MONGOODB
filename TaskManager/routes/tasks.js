const express = require('express')
const router = express.Router()


const {
  getAllTask,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

// Method # 1
router.get('/', getAllTask);
router.post('/', createTask);
router.get('/:id',getSingleTask);
router.patch('/:id',updateTask)
router.delete('/:id', deleteTask)

// Method # 2
//Or we can write the same thing in this way

// Without Controller                   ||        Using Controller

// router.route('/').get((req,res)=>{   || router.route('/').get(getAllTasl)
//     res.send('all items')            ||
// })                                   ||

module.exports = router
