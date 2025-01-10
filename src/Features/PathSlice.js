// Features/Paths.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  path: [],
  breadCrumbs: [],
  bottomTab: false,
  currentDirectory: "",
};

const getStudentHistory = () => {
  return JSON.parse(localStorage.getItem("studentHistory")) || [];
};

const pathsSlice = createSlice({
  name: "paths",
  initialState,
  reducers: {
    addBreadCrumb: (state, action) => {
      const historyData = action.payload[0];
      const index = state.breadCrumbs.findIndex(
        (crumb) => crumb?.path === historyData?.path
      );
      if (index === -1 && index != undefined) {
        state.breadCrumbs.push(historyData);
        state.breadCrumbs = state.breadCrumbs.filter((item) => item != null);
      } else {
        state.breadCrumbs.splice(index + 1);
      }
    },
    clearBreadCrumb: (state) => {
      state.breadCrumbs = [];
    },
    setCurrentDirectory: (state, action) => {
      state.currentDirectory = action.payload;
    },
    storeBreadCrumbs: (state) => {
      localStorage.setItem(
        "TemporaryBreadCrumbs",
        JSON.stringify(state.breadCrumbs)
      );
    },
    restoreBreadCrumbs: (state, action) => {
      let tempExist =
        JSON.parse(localStorage.getItem("TemporaryBreadCrumbs")) || [];
      if (tempExist.length > 0) {
        state.breadCrumbs = JSON.parse(
          localStorage.getItem("TemporaryBreadCrumbs")
        );
        localStorage.setItem("TemporaryBreadCrumbs", JSON.stringify([]));
      }
    },
    toggleBottomTab: (state) => {
      state.bottomTab = !state.bottomTab;
    },
  },
});

export const {
  addBreadCrumb,
  clearBreadCrumb,
  setCurrentDirectory,
  storeBreadCrumbs,
  restoreBreadCrumbs,
  toggleBottomTab,
} = pathsSlice.actions;

export default pathsSlice.reducer;
