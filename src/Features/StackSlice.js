// src/features/stack/stackSlice.js
import { createSlice } from '@reduxjs/toolkit';

const stackSlice = createSlice({
  name: 'stack',
  initialState: {
    components: []
  },
  reducers: {
    pushComponent: (state, action) => {
        state.components.shift();
        // console.log('inside stack',action)
        state.components.push(action.payload);
    },
    popComponent: (state) => {
      state.components.pop();
    },
    clearStack: (state) => {
      state.components = [];
    }
  }
});

export const { pushComponent, popComponent, clearStack } = stackSlice.actions;
export default stackSlice.reducer;
