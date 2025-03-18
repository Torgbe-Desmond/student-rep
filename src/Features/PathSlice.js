import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FolderService } from "../Services/FolderService";

const initialState = {
  path: [],
  breadCrumbs: [],
  bottomTab: false,
  currentDirectory: "",
  loading: false,
  error: null,
};

export const getBreadCrumb = createAsyncThunk(
  "folder/breadCrumbs",
  async ({ reference_Id, directoryId }, thunkAPI) => {
    try {
      const response = await FolderService.breadCrumb(reference_Id, directoryId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data || "An error occurred");
    }
  }
);

const pathsSlice = createSlice({
  name: "paths",
  initialState,
  reducers: {
    clearBreadCrumb: (state) => {
      state.breadCrumbs = [];
      state.error = null;
    },
    setCurrentDirectory: (state, action) => {
      if (action.payload) {
        state.currentDirectory = action.payload;
      }
    },
    toggleBottomTab: (state) => {
      state.bottomTab = !state.bottomTab;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBreadCrumb.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBreadCrumb.fulfilled, (state, action) => {
        state.loading = false;
        state.breadCrumbs = action.payload?.data || [];
      })
      .addCase(getBreadCrumb.rejected, (state, action) => {
        state.loading = false;
        state.breadCrumbs = [];
        state.error = action.payload;
      });
  },
});

export const { clearBreadCrumb, setCurrentDirectory, toggleBottomTab } = pathsSlice.actions;
export default pathsSlice.reducer;
