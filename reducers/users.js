import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { name: null, username: null , token: null},
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.name = action.payload.name;
      state.value.username = action.payload.username;
      state.value.token = action.payload.token;
    },
    logout: (state) => {
      state.value.name = null;
      state.value.username = null;
      state.value.token = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;