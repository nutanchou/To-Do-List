const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// POST route to add a new task
router.post('/tasks', async (req, res) => {
  const { name, description, status } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: 'Name and description are required' });
  }

  try {
    // Create a new task instance with the current date
    const newTask = new Task({
      name,
      description,
      status: status || 'PENDING', // Default to 'PENDING' if status is not provided
      date: new Date(), // Store the current date and time
    });

    // Save the task to the database
    await newTask.save();

    // Send the saved task back as a response
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Failed to add task', error: error.message });
  }
});

// GET route to fetch tasks with pagination, sorting, and filtering
router.get('/tasks', async (req, res) => {
  const { search, sort = 'desc', status = 'all', page = 1, limit = 5 } = req.query;

  const query = {};

  if (status && status !== 'all') {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  try {
    // Fetch tasks, sorted by 'date' in descending order (newest first)
    const tasks = await Task.find(query)
      .sort({ date: sort === 'asc' ? 1 : -1 }) // Sort by date (ascending or descending)
      .skip((page - 1) * limit) // Pagination: skip tasks based on page number
      .limit(parseInt(limit)) // Limit the number of tasks per page
      .exec();

    const totalTasks = await Task.countDocuments(query); // Get total task count for pagination

    res.json({
      tasks,
      totalTasks,
      totalPages: Math.ceil(totalTasks / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
});

// PUT route to update a task
router.put('/tasks/:id', async (req, res) => {
  const { name, description, status } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: 'Name and description are required' });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { name, description, status },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
});

module.exports = router;

