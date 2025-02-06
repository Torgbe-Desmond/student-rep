import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../Services/AuthService";

const initialState = {
  reference_Id: null,
  status: "idle",
  logoutStatus: "idle",
  registerStatus: "idle",
  verifyEmailStatus: "idle",
  updatePasswordStatus: "idle",
  role: "",
  errorMessage: null,
  message: "",
  code:null,
  data: [],
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await AuthService.login(credentials);
      return response;
    } catch (error) {
      const message = error?.response?.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userInfo, thunkAPI) => {
    try {
      const response = await AuthService.register(userInfo);
      return response;
    } catch (error) {
      const message = error?.response?.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async ({ token, userId }, thunkAPI) => {
    try {
      const response = await AuthService.deleteUser(token, userId);
      return response;
    } catch (error) {
      const message = error?.response?.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await AuthService.logout();
    return response;
  } catch (error) {
    const message = error?.response?.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export const sendRecoveryLink = createAsyncThunk(
  "auth/sendRecoveryLink",
  async (email, thunkAPI) => {
    try {
      const response = await AuthService.sendRecoveryLink(email);
      return response;
    } catch (error) {
      const message = error?.response?.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({ newPassword }, thunkAPI) => {
    try {
      const response = await AuthService.updatePassword(newPassword);
      return response;
    } catch (error) {
      const message = error?.response?.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async ({ email }, thunkAPI) => {
    try {
      const response = await AuthService.verifyEmail(email);
      return response;
    } catch (error) {
      const message = error?.response?.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getVerificationToken = createAsyncThunk(
  "auth/getVerificationToken",
  async ({ reference_Id }, thunkAPI) => {
    try {
      const response = await AuthService.getVerificationToken(reference_Id);
      return response;
    } catch (error) {
      const message = error?.response?.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAll = createAsyncThunk("auth/getAll", async (_, thunkAPI) => {
  try {
    const response = await AuthService.getAll();
    return response;
  } catch (error) {
    const message = error?.response?.data;
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
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
      state.status = "idle";
      state.logoutStatus = "idle";
      state.registerStatus = "idle";
      localStorage.removeItem("token");
      localStorage.removeItem("reference_Id");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        const {
          data: { reference_Id, token },
          message,
          success,
        } = action.payload;
        state.status = "succeeded";
        state.reference_Id = reference_Id;
        state.message = message;
        localStorage.setItem("token", token);
        localStorage.setItem("reference_Id", reference_Id);
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.payload);
        const {
          error: { message, code },
          success,
        } = action.payload;
        state.code = code
        state.status = "failed";
        state.errorMessage = message;
      })

      .addCase(register.pending, (state) => {
        state.registerStatus = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        const {
          data: { reference_Id, token },
          message,
          success,
        } = action.payload;
        state.registerStatus = "succeeded";
        state.reference_Id = reference_Id;
        state.message = message;
        localStorage.setItem("token", token);
        localStorage.setItem("reference_Id", reference_Id);
      })
      .addCase(register.rejected, (state, action) => {
        const {
          error: { message, code },
          success,
        } = action.payload;
        state.registerStatus = "failed";
        state.errorMessage = message;
        state.code = code

      })

      .addCase(logout.pending, (state, action) => {
        state.logoutStatus = "loading";
      })
      .addCase(logout.fulfilled, (state, action) => {
        const { message } = action.payload;
        state.logoutStatus = "succeeded";
        state.message = message;

      })
      .addCase(logout.rejected, (state, action) => {
        const {
          error: { message, code },
          success,
        } = action.payload;
        state.logoutStatus = "failed";
        state.errorMessage = message;
        state.code = code

      })

      .addCase(verifyEmail.pending, (state) => {
        state.verifyEmailStatus = "loading";
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        const {
          message,
        } = action.payload;
        state.verifyEmailStatus = "succeeded";
        state.message = message;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        const {
          error: { message, code },
          success,
        } = action.payload;
        state.verifyEmailStatus = "failed";
        state.errorMessage = message;
        state.code = code

      })

      .addCase(updatePassword.pending, (state) => {
        state.updatePasswordStatus = "loading";
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        const {
          message,
          success,
        } = action.payload;
        state.updatePasswordStatus = "succeeded";
        state.message = message;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        const {
          error: { message, code },
          success,
        } = action.payload;
        state.updatePasswordStatus = "failed";
        state.errorMessage = message;
        state.code = code

      })

      .addCase(getVerificationToken.pending, (state) => {
        state.verificationTokenStatus = "loading";
      })
      .addCase(getVerificationToken.fulfilled, (state, action) => {
        const {
          data :{ token },
          message,
          success,
        } = action.payload;
        state.verificationTokenStatus = "succeeded";
        state.message = message;
        localStorage.setItem("verificationToken", token);
      })
      .addCase(getVerificationToken.rejected, (state, action) => {
        const {
          error: { message, code },
          success,
        } = action.payload;
        state.verificationTokenStatus = "failed";
        state.errorMessage = message;
        state.code = code
      });
  },
});

export const { setAuthData, clearAuthData, clearError } = authSlice.actions;
export default authSlice.reducer;
