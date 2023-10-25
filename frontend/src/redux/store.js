import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import roomReducer from './room/roomSlice';
import seriesReducer from './series/seriesSlice';
import userUtilsReducer from './user/userUtilsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    rooms: roomReducer,
    series: seriesReducer,
    userUtils: userUtilsReducer,
  },
});

export default store;
