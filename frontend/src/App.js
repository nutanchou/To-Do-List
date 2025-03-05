import React, { useState } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const routes = [
    {
      path: "/",
      element: <TaskList />,
    },
    {
      path: "/login",
      element: <Login onLogin={() => setIsLoggedIn(true)} />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/add-task",
      element: <AddTask />,
    },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  const element = useRoutes(routes);

  return (
    <div>
      {/* Conditionally render the logout button if the user is logged in */}
      {isLoggedIn && (
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      )}

      {element}
    </div>
  );
};

export default App;
