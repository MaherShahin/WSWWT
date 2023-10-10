import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = '';
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    addFriend: (state, action) => {
      state.user.friends.push(action.payload);
    },
  },
});

export const { loginUser, logoutUser, updateUser, addFriend } = userSlice.actions;

export default userSlice.reducer;
