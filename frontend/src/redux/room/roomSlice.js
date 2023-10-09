import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    joinedRooms: [],
    createdRooms: [],
    currentRoom: null,
};

const userSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
      setRooms: (state, action) => {
        state.joinedRooms = [...action.payload.joinedRooms];
        state.createdRooms = [...action.payload.createdRooms];
      },
      createRoom: (state, action) => {
        state.createdRooms = [...state.createdRooms, action.payload];
        state.joinedRooms = [...state.joinedRooms, action.payload];
      },
      joinRoom: (state, action) => {
        state.joinedRooms = [...state.joinedRooms, action.payload];
      },
      leaveRoom: (state, action) => {
        state.joinedRooms = state.joinedRooms.filter((room) => room?._id !== action.payload?._id);
        state.createdRooms = state.createdRooms.filter((room) => room?._id !== action.payload?._id);
      },
      setCurrentRoom: (state, action) => {
        state.currentRoom = action.payload;
      },
    },
  });

export const { setRooms, createRoom, joinRoom, leaveRoom, setCurrentRoom } = userSlice.actions;


export default userSlice.reducer;
