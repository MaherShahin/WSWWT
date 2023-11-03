import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import roomReducer from './room/roomSlice';
import userUtilsReducer from './user/userUtilsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    rooms: roomReducer,
    userUtils: userUtilsReducer,
  },
});

export default store;
