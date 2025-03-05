const Task = require('../models/Task');
const User = require('../models/User');

const createTask = async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const newTask = new Task({
      name,
      description,
      status,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ message: 'An error occurred while adding the task' });
  }
};

const getTasks = async (req, res) => {
  const { page = 1, status = '', search = '' } = req.query;

  try {
    const tasks = await Task.find({
      userId: req.user.id,
      ...(status && { status }),
      ...(search && { name: { $regex: search, $options: 'i' } })
    })
      .skip((page - 1) * 10)
      .limit(10)
      .sort({ createdAt: -1 });

    const totalTasks = await Task.countDocuments({ userId: req.user.id });

    res.status(200).json({
      tasks,
      totalPages: Math.ceil(totalTasks / 10),
    });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving tasks', error: err.message });
  }
};

const updateTaskStatus = async (req, res) => {
  const { id, status } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { status },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error updating task status', error: err.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'An error occurred while fetching tasks' });
  }
};

module.exports = { createTask, getAllTasks, getTasks, updateTaskStatus };
