import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  token: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = "";
      state.token = "";
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
