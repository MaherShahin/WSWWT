import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logoutAction: (state) => {
      state.user = null;
      state.token = '';
    },
    updateUserAction: (state, action) => {
      state.user = action.payload;
    },
    addFriendAction: (state, action) => {
      state.user.friends.push(action.payload);
    },
  },
});

export const { loginAction, logoutAction, updateUserAction, addFriendAction } = userSlice.actions;

export default userSlice.reducer;
