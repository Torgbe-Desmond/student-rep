// Features/Paths.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    colorDifferentiation:false
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleColor:(state)=>{
        state.colorDifferentiation = !state.colorDifferentiation
    }
  },
});

export const { 
    toggleColor
} = settingsSlice.actions;

export default settingsSlice.reducer;
