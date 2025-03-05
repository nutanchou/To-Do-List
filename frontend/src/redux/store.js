// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';  // Import authSlice for authentication state
import taskReducer from './taskSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});

export default store;
