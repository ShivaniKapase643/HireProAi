import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try { 
    const { data } = await api.post('/auth/login', credentials); 
    localStorage.setItem('token', data.token); 
    return data; 
  }
  catch (err) { 
    const errors = err.response?.data?.errors;
    if (errors && errors.length > 0) {
      return rejectWithValue(errors.map(e => e.msg).join(', '));
    }
    return rejectWithValue(err.response?.data?.message || err.message || 'Login failed'); 
  }
});

export const googleLogin = createAsyncThunk('auth/google', async (credential, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/google', { credential });
    localStorage.setItem('token', data.token);
    return data;
  }
  catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message || 'Google sign-in failed');
  }
});

export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try { 
    const { data } = await api.post('/auth/register', userData); 
    localStorage.setItem('token', data.token); 
    return data; 
  }
  catch (err) { 
    // Extract specific error message from backend
    const errors = err.response?.data?.errors;
    if (errors && errors.length > 0) {
      // Validation errors array
      return rejectWithValue(errors.map(e => e.msg).join(', '));
    }
    return rejectWithValue(err.response?.data?.message || err.message || 'Registration failed'); 
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: localStorage.getItem('token'), isLoading: false, error: null },
  reducers: {
    logout: (state) => { state.user = null; state.token = null; localStorage.removeItem('token'); },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => { state.isLoading = false; state.user = action.payload.user; state.token = action.payload.token; })
      .addCase(loginUser.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      .addCase(googleLogin.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(googleLogin.fulfilled, (state, action) => { state.isLoading = false; state.user = action.payload.user; state.token = action.payload.token; })
      .addCase(googleLogin.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      .addCase(registerUser.pending, (state) => { state.isLoading = true; })
      .addCase(registerUser.fulfilled, (state, action) => { state.isLoading = false; state.user = action.payload.user; state.token = action.payload.token; })
      .addCase(registerUser.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
