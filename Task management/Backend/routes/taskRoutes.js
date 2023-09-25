const express = require('express');
const router = express.Router();
const taskController = require('./controllers/taskController');

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.delete('/:id', taskController.deleteTask);
router.put('/tasks/:id', taskController.updateTaskStatus);



module.exports = router;
