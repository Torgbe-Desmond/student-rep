import { createSlice } from '@reduxjs/toolkit';

const stackSlice = createSlice({
  name: 'stack',
  initialState: {
    components: [],
    stackState:''
  },
  reducers: {
    pushComponent: (state, action) => {
        state.components.shift();
        state.components.push(action.payload);
        state.stackState = 'mounted'
    },
    popComponent: (state) => {
      state.components.pop();
    },
    clearStack: (state) => {
      state.components = [];
      state.stackState = 'dropped'
    }
  }
});

export const { pushComponent, popComponent, clearStack } = stackSlice.actions;
export default stackSlice.reducer;
