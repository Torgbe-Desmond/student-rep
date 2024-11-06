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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['"stack/pushComponent"'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
});
