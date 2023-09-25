const { Task } = require('../../models/');

const createTask = async (req, res) => {
  try {
    const { project_id, name, deadline } = req.body;
    const task = await Task.create({ project_id, name, deadline });
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
  const { taskId } = req.params;
  const { completed } = req.body;

  try {
    const updatedTask = await Task.update({ completed }, { where: { id: taskId } });

    if (updatedTask[0] === 1) {
      res.json({ message: 'Task status updated successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  updateTaskStatus,
};

module.exports = {
  createTask,
  getTasks,
  deleteTask,
  updateTaskStatus
};
