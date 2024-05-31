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
    clearAuth: (state) => {
      (state.token = null), (state.pin = null);
    },
  },
});

export const { setToken, clearAuth } = authSlice.actions;

export default authSlice.reducer;
