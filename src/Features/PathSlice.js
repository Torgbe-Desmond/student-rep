// Features/Paths.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  path: [],
  breadCrumbs: [],
  currentDirectory: '',
};

const getStudentHistory = () => {
  return JSON.parse(localStorage.getItem('studentHistory')) || [];
};

const pathsSlice = createSlice({
  name: 'paths',
  initialState,
  reducers: {
    addBreadCrumb: (state, action) => {
      const historyData = action.payload;
      const index = state.breadCrumbs.findIndex(crumb => crumb?.path === historyData?.path);
      if (index === -1) {
        // Path not in the array, add the new breadcrumb object
        state.breadCrumbs.push(historyData);
      } else {
        // Path found, remove everything after the index
        state.breadCrumbs = state.breadCrumbs.slice(0, index + 1);
      }
    },
    clearBreadCrumb: (state) => {
      state.breadCrumbs = [];
    },
    setCurrentDirectory: (state, action) => {
      state.currentDirectory = action.payload;
    },
    addStudentHistory: (state, action) => {
      const { _id, name } = action.payload;
      const history = getStudentHistory();
      const exists = history.some(historyItem => historyItem._id === _id);
      if (!exists) {
        const newHistory = [...history, { _id, name }];
        localStorage.setItem('studentHistory', JSON.stringify(newHistory));
      }
    },
  },
});

export const { 
  addBreadCrumb, 
  clearBreadCrumb, 
  setCurrentDirectory,
  addStudentHistory 
} = pathsSlice.actions;

export default pathsSlice.reducer;
