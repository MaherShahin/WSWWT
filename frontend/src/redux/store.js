import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import roomReducer from './room/roomSlice';
import seriesReducer from './series/seriesSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    rooms: roomReducer,
    series: seriesReducer,
  },
});

export default store;
