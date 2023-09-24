import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useApi } from '../../hooks/useApi';
import { setRooms } from '../room/roomSlice';


const initialState = {
  user: null,
  token: '',
};


export const loginUserAndFetchRooms = createAsyncThunk(
  'user/loginUserAndFetchRooms',
  async (userData, { dispatch }) => {
    const SIGN_IN_ENDPOINT = '/auth/login';
    const ROOMS_API_ENDPOINT = '/user/rooms';

    const { request } = useApi();

    const loginResponse = await request({
      method: 'post',
      url: SIGN_IN_ENDPOINT,
      data: userData
    });

    if (loginResponse) {
      const { user, token } = loginResponse.data;
      dispatch(loginUser({ user, token }));
    }
               
    const roomResponse = await request({
      method: 'get',
      url: ROOMS_API_ENDPOINT,
    });

    if (roomResponse) {
      const { joinedRooms, createdRooms } = roomResponse.data;
      dispatch(setRooms({ joinedRooms, createdRooms }));
    }

    return;
  }
);

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
  },
});

export const { loginUser, logoutUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
