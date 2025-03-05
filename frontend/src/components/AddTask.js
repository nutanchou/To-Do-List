import React, { useState, useEffect } from 'react';
import './AddTask.css';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('PENDING');
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [sortByDate, setSortByDate] = useState('');
  const [sortByStatus, setSortByStatus] = useState('all');
  const [editTask, setEditTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks?search=${search}&sort=${sortByDate}&status=${sortByStatus}&page=${currentPage}&limit=5`
      );
      const data = await response.json();
      setTasks(data.tasks);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, sortByDate, sortByStatus, currentPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: title,
          description,
          status,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        fetchTasks();
        setTitle('');
        setDescription('');
        setStatus('PENDING');
      } else {
        console.error('Error adding task:', result);
        alert('An error occurred while adding the task');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the task');
    }
  };

  const handleUpdate = async (taskId) => {
    const updatedTask = {
      name: title,
      description: description,
      status: status,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      const result = await response.json();
      if (response.ok) {
        fetchTasks();
        setEditTask(null);
        setTitle('');
        setDescription('');
        setStatus('PENDING');
      } else {
        console.error('Error updating task:', result);
        alert('An error occurred while updating the task');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the task');
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setTitle(task.name);
    setDescription(task.description);
    setStatus(task.status);
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="add-task">
      <h1>Add Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="PENDING">PENDING</option>
            <option value="DONE">DONE</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">{editTask ? 'Update Task' : 'Add Task'}</button>
      </form>

      <div className="filters">
        <input
          type="text"
          placeholder="Search tasks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <div className="dropdowns">
          <select onChange={(e) => setSortByDate(e.target.value)} value={sortByDate}>
            <option value="">Sort by Date (All)</option>
            <option value="asc">Sort by Date (Ascending)</option>
            <option value="desc">Sort by Date (Descending)</option>
          </select>
          <select onChange={(e) => setSortByStatus(e.target.value)} value={sortByStatus}>
            <option value="all">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="DONE">Done</option>
          </select>
        </div>
      </div>

      <h2>Task List</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task._id} className="task-item">
            {editTask && editTask._id === task._id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="DONE">DONE</option>
                </select>
                <button onClick={() => handleUpdate(task._id)} className="btn-submit">Update</button>
                <button onClick={() => setEditTask(null)} className="btn-cancel">Cancel</button>
              </div>
            ) : (
              <div className="task-info">
                <h3>{task.name}</h3>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>
                <p>Date: {formatDate(task.date)}</p>
                <button onClick={() => handleEdit(task)} className="btn-edit">Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="btn-pagination"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="btn-pagination"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AddTask;

