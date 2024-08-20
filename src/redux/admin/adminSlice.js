import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAdmin: null,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    
    loginStart: (state) => {
      state.error = null;
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.currentAdmin = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    
    logOutStart: (state) => {
      state.loading = true;
    },
    logOutSuccess: (state) => {
      state.currentAdmin = null;
      state.loading = false;
      state.error = null;
    },
    logOutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    // This reducer is to set the user data in the state related to admin-page route
    setUpAdmin: (state, action) => {
      state.currentAdmin = action.payload;
      state.loading = false;
      state.error = null;
    },
    // This reducer is to delete the user data from the state related to admin-page route
    deleteAdmin: (state) => {
      state.currentAdmin = null;
      state.loading = false;
      state.error = null;
    }
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  
  logOutStart,
  logOutSuccess,
  logOutFailure,
  
  clearError,
  setUpAdmin,
  deleteAdmin,
} = adminSlice.actions;

export default adminSlice.reducer;

// Reducer: A pure function that takes the current state and an action, then returns a new state based on the action type and payload.
