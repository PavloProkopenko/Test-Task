import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  pin: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setPin: (state, action) => {
      state.pin = action.payload;
    },
    clearAuth: (state) => {
      (state.token = null), (state.pin = null);
    },
  },
});

export const { setToken, setPin, clearAuth } = authSlice.actions;

export default authSlice.reducer;
