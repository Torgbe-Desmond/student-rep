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
    
      let breadCrumbs = [
      ];
    
      const savedBreadCrumbs = JSON.parse(localStorage.getItem('breadCrumbs')) || [];
      breadCrumbs.push(...savedBreadCrumbs);
    
      const pathSet = new Set();
    
      const updatedBreadCrumbs = [];
      breadCrumbs.forEach(crumb => {
        if (!pathSet.has(crumb?.path)) {
          pathSet.add(crumb?.path);
          updatedBreadCrumbs.push(crumb);
        }
      });
    
      const index = updatedBreadCrumbs.findIndex(crumb => crumb?.path === historyData?.path);
      if (index === -1) {
        updatedBreadCrumbs.push(historyData);
      } else {
        updatedBreadCrumbs.splice(index + 1);
      }
    
      const finalBreadCrumbs = updatedBreadCrumbs.filter(breadcrumb => breadcrumb != null && breadcrumb !== '');
    
      localStorage.setItem('breadCrumbs', JSON.stringify(finalBreadCrumbs));
    },
    
    clearBreadCrumb: (state) => {
      localStorage.setItem('breadCrumbs', JSON.stringify([]));    
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
