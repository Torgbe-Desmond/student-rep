// src/Features/activeTabsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const someObject = {
   initialPath:'',
   secondaryPaths:[],
}

const initialState = {
  activeSearch:false,
  search:'',
  breadcrumbs:null,
  selectedIs:[],
  fileIds: [],
  directoryIds: [],
  sidebarItems:[],
  
}

export const extraSlice = createSlice({
  name: 'activeTabs',
  initialState,
  reducers: {
    toggleActive: (state) => {
      state.activeSearch = !state.activeSearch 
    },
    search:(state,action)=>{
      state.search = action.payload;
    },
    clearSearch:(state)=>{
      state.search = '';
    },
    setBreadCrumbs:(state,action)=>{

    },
    clearBreadCrumbs:(state,action)=>{

    },
    onReloadTakeCareOfBreadCrumbs:(state,action)=>{
      
    },
    setFileIds: (state, action) => {
      const fileId = action.payload;
      if (state.fileIds.includes(fileId)) {
        state.fileIds = state.fileIds.filter(id => id !== fileId);
      } else {
        state.fileIds = [...state.fileIds, fileId];
      }
    },
    setDirectoryIds: (state, action) => {
      const directoryId = action.payload;
      if (state.directoryIds.includes(directoryId)) {
        state.directoryIds = state.directoryIds.filter(id => id !== directoryId);
      } else {
        state.directoryIds = [...state.directoryIds, directoryId];
      }
    },
    setSelectedIds:(state,action)=>{
      if (state.selectedIs.includes(action.payload)) {
        state.selectedIs = state.selectedIs.filter(id => id !== action.payload);
      } else {
        state.selectedIs = [...state.selectedIs, action.payload];
      }},
      clearSelectedIds:(state)=>{
        state.selectedIs = [];
     },
     setSibebarItems:(state,action)=>{
        state.sidebarItems = [...action.payload];
     }
      
  },

})

export const { 
  toggleActive,
  search,
  clearSearch,
  setSelectedIds,
  clearSelectedIds,
  setFileIds,
  setDirectoryIds
 } = extraSlice.actions;

export default extraSlice.reducer;
