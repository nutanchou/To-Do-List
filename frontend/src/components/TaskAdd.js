import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../redux/taskSlice';

const TaskAdd = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask({ name, description }));
    setName('');
    setDescription('');
  };

  return (
    <div>
      <h2>Add a Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Task Name"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          required
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskAdd;
