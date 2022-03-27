import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js'
import taskReducer from '../features/tasks/taskSlice.js'
import commentReducer from '../features/comments/commentSlice.js';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    comments: commentReducer
  },
});
