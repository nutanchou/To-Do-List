import React from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import './ToDoList.css';

const ToDoList = () => {
  return (
    <div className="todo-list-container">
      <h1 className="text-2xl font-semibold">My To-Do List</h1>
      <AddTask />
      <TaskList />
    </div>
  );
};

export default ToDoList;
