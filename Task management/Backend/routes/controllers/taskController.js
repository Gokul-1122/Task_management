const { Task } = require('../../models/');

const createTask = async (req, res) => {
  try {
    console.log(req.body);
    const { project_id, name, deadline } = req.body;
    const task = await Task.create({
       projectName:project_id,
       name: name, 
       deadline:deadline });
    res.json({ taskId: task.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getTasks = async (req, res) => {
  try {
    let tasks = await Task.findAll();
    if (tasks) {
      res.send({ statusCode: 200, tasks });
    } else {
      res.status(400).send({ statusCode: 400, message: "No data" });
    }
  } catch (error) {
    res.status(500).send({ statusCode: 400, message: "Internal error" });
  }
};

const deleteTask = async (req, res) => {
  console.log("backend");
  try {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const updateTaskStatus = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { status } = req.body;
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.status === 'completed') {
      return res.status(400).json({ message: 'Task is already completed and cannot be changed.' });
    }

    task.status = status;
    await task.save();

    res.json({ message: 'Task status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




module.exports = {
  createTask,
  getTasks,
  deleteTask,
  updateTaskStatus
};
