import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../Services/AuthService';

const initialState = {
  reference_Id: null,
  status: 'idle', 
  logoutStatus:'idle',
  registerStatus:'idle',
  role:'',
  error: null,
  message: null, 
  data: [],
};

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
      const response =  await AuthService.login(credentials);
      return response;
  } catch (error) {
      let message = error?.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
  }
});

export const register = createAsyncThunk('auth/register', async (userInfo, thunkAPI) => {
  try {
      const response = await AuthService.register(userInfo);
      return response;
  } catch (error) {
      let message = error?.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
  }
});

export const deleteUser = createAsyncThunk('auth/deleteUser', async ({ token, userId }, thunkAPI) => {
  try {
      const response = await AuthService.deleteUser(token, userId);
      return response;
  } catch (error) {
      let message = error?.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
      const response = await AuthService.logout();
      return response;
  } catch (error) {
      let message = error?.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
  }
});

export const sendRecoveryLink = createAsyncThunk('auth/sendRecoveryLink', async (email, thunkAPI) => {
  try {
      const response = await AuthService.sendRecoveryLink(email);
      return response;
  } catch (error) {
      let message = error?.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
  }
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async ({ token, email }, thunkAPI) => {
  try {
      const response = await AuthService.forgotPassword(token, email);
      return response;
  } catch (error) {
      let message = error?.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
  }
});

export const getAll = createAsyncThunk('auth/getAll', async (_, thunkAPI) => {
  try {
      const response = await AuthService.getAll();
      return response;
  } catch (error) {
      let message = error?.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.token = action.payload.token;
      state.reference_Id = action.payload.reference_Id;
      state.message = action.payload.message;
    },
    clearAuthData: (state) => {
      state.token = null;
      state.reference_Id = null;
      state.message = null; 
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        localStorage.setItem('token', action.payload.token);
        state.reference_Id = action.payload.reference_Id;
        localStorage.setItem('reference_Id',action.payload?.reference_Id)
        state.message = action.payload.message; 
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; 
        state.message = action.payload; 

      })
      .addCase(register.pending, (state) => {
        state.registerStatus = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registerStatus = 'succeeded';
        state.reference_Id = action.payload?.reference_Id;
        localStorage.setItem('token', action.payload?.token);
        localStorage.setItem('reference_Id',action.payload?.reference_Id)
        state.message = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerStatus = 'failed';
        state.error = action.payload; 
        state.message = action.payload?.message; 
      })      
      .addCase(logout.pending, (state) => {
        state.logoutStatus = 'loading';
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.logoutStatus = 'succeeded';
        state.message = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutStatus = 'failed';
        state.error = action.payload; 
        state.message = action.payload?.message; 
      })      
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
