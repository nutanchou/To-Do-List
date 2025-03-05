const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: { type: String, enum: ['PENDING', 'DONE'], default: 'PENDING' },
  date: { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
