// src/Features/activeTabsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTopTab: [],
  activeButtomTab:null
}

export const activeTabsSlice = createSlice({
  name: 'activeTabs',
  initialState,
  reducers: {
    setActiveTopTab: (state, action) => {
      state.activeTopTab = action.payload;
    },
    setActiveButtomTab:(state, action) => {
        state.activeButtomTab = action.payload;
      },
  },
});

export const { setActiveTab,setActiveButtomTab } = activeTabsSlice.actions;

export default activeTabsSlice.reducer;
