// src/Features/cacheSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cachedHome: [],
  cachedSubscriptions: [],
  cachedSubscribed: [],
  cachedDownloads: [],
  cachedWorkSpace: [],
};

const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    cacheData: (state, action) => {
      const { windowId, data } = action.payload;
      switch (windowId) {
        case '':
          state.cachedHome = data;
          break;
        case 'subscriptions':
          state.cachedSubscriptions = data;
          break;
        case 'subscribed':
          state.cachedSubscribed = data;
          break;
        case 'downloads':
          state.cachedDownloads = data;
          break;
        case 'workspace':
          state.cachedWorkSpace = data;
          break;
        default:
          break;
      }
    },
    clearCachedData: (state, action) => {
      const { windowId } = action.payload;
      switch (windowId) {
        case '':
          state.cachedHome = [];
          break;
        case 'subscriptions':
          state.cachedSubscriptions = [];
          break;
        case 'subscribed':
          state.cachedSubscribed = [];
          break;
        case 'downloads':
          state.cachedDownloads = [];
          break;
        case 'workspace':
          state.cachedWorkSpace = [];
          break;
        default:
          break;
      }
    },
  },
});

export const { cacheData, clearCachedData } = cacheSlice.actions;

export default cacheSlice.reducer;
