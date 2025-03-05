import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../redux/taskSlice';
import './TaskList.css';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const totalTasks = useSelector((state) => state.tasks.totalTasks);
  const totalPages = useSelector((state) => state.tasks.totalPages);
  const currentPage = useSelector((state) => state.tasks.currentPage);
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('desc');

  const handlePageChange = (page) => {
    dispatch(fetchTasks({ page, status, search, sort }));
  };

  useEffect(() => {
    dispatch(fetchTasks({ page: 1, status, search, sort }));
  }, [dispatch, status, search, sort]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h1>Task List</h1>
        <div className="filters">
          <input
            type="text"
            placeholder="Search tasks"
            value={search}
            onChange={handleSearchChange}
            className="search-input"
          />
          <select onChange={handleStatusChange} value={status} className="status-filter">
            <option value="all">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="DONE">Done</option>
          </select>
          <select onChange={handleSortChange} value={sort} className="sort-filter">
            <option value="">All</option>
            <option value="asc">Sort by Date (Ascending)</option>
            <option value="desc">Sort by Date (Descending)</option>
          </select>
        </div>
      </div>

      <div className="task-list">
        {tasks && Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="task-item">
              <h3 className="task-title">{task.name}</h3>
              <p className="task-description">{task.description}</p>
              <p className="task-status">Status: <span className={task.status === 'DONE' ? 'status-done' : 'status-pending'}>{task.status}</span></p>
              <p className="task-date">Date: {new Date(task.date).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="no-tasks">No tasks found</p>
        )}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>
        <span className="pagination-info">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
