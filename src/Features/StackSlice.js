import { createSlice } from "@reduxjs/toolkit";

const stackSlice = createSlice({
  name: "stack",
  initialState: {
    search: false,
    components: [],
    stackState: "",
  },
  reducers: {
    pushComponent: (state, action) => {
      state.components.shift();
      state.components.push(action.payload);
      state.stackState = "mounted";
    },
    popComponent: (state) => {
      state.components.pop();
    },
    clearStack: (state) => {
      state.components = [];
      state.stackState = "dropped";
    },
    toggleSearch: (state) => {
      state.search = !state.search;
    },
  },
});

export const { pushComponent, popComponent, clearStack, toggleSearch } =
  stackSlice.actions;
export default stackSlice.reducer;
