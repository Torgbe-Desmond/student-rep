import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../Services/AuthService';

const initialState = {
  reference_Id: null,
  status: 'idle', 
  studentStatus:'idle',
  registerStatus:'idle',
  role:'',
  error: null,
  message: null, // Added message to the initial state
  data: [],
};

// Async thunk for fetching auth data from an API
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
      const response =  await AuthService.login(credentials);
      console.log('is there data',response)
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

export const studentLogin = createAsyncThunk('auth/studentLogin', async (credentials, thunkAPI) => {
  try {
      const response =  await AuthService.studentLogin(credentials);
      console.log('is there data',response)
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
      state.message = action.payload.message; // Set message when setting auth data
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
        state.error = action.payload; // Use action.payload for the error message
        state.message = action.payload; // Set message on login failure
      })
      .addCase(register.pending, (state) => {
        state.registerStatus = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registerStatus = 'succeeded';
        state.reference_Id = action.payload?.reference_Id;
        localStorage.setItem('token', action.payload?.token);
        localStorage.setItem('reference_Id',action.payload?.reference_Id)
        localStorage.setItem('role',action.payload?.role)
        state.message = action.payload.message; // Set message on register success
      })
      .addCase(register.rejected, (state, action) => {
        state.registerStatus = 'failed';
        state.error = action.payload; // Use action.payload for the error message
        state.message = action.payload; // Set message on register failure
      })

      .addCase(studentLogin.pending, (state) => {
        state.studentStatus = 'loading';
      })
      .addCase(studentLogin.fulfilled, (state, action) => {
        state.studentStatus = 'succeeded';
        localStorage.setItem('StudentToken', action.payload.token);
        localStorage.setItem('StudentReference_Id',action.payload?.reference_Id)
        state.reference_Id = action.payload.reference_Id;
        localStorage.setItem('StudentRole',action.payload.role)
        state.message = action.payload.message; // Set message on studentLogin success
      })
      .addCase(studentLogin.rejected, (state, action) => {
        state.studentStatus = 'failed';
        state.error = action.payload; // Use action.payload for the error message
        state.message = action.payload; // Set message on login failure
      })
      
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
