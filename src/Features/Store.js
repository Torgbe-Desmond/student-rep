import { configureStore } from '@reduxjs/toolkit';
import stackReducer from './StackSlice';
import workspaceRedduce from './WorkSpace'
import authReducer from './AuthSlice'
import pathReducer from './PathSlice'
import settingsReducer from './settingsSlice'
import themeReducer from './ThemeSlice';
export const store = configureStore({
  reducer: {
    stack: stackReducer,
    work:workspaceRedduce,
    auth:authReducer,
    path:pathReducer,
    settings:settingsReducer,
    theme:themeReducer
  },
});
