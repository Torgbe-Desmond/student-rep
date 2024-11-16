// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import stackReducer from './StackSlice';
import workspaceRedduce from './WorkSpace'
import authReducer from './AuthSlice'
import pathReducer from './PathSlice'


export const store = configureStore({
  reducer: {
    stack: stackReducer,
    work:workspaceRedduce,
    auth:authReducer,
    path:pathReducer,
  },
});
