import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    joinedRooms: [],
    createdRooms: [],
    currentRoom: null,
};

const roomSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
      setRoomsAction: (state, action) => {
        state.joinedRooms = [...action.payload.joinedRooms];
        state.createdRooms = [...action.payload.createdRooms];
      },
      createRoomAction: (state, action) => {
        state.createdRooms = [...state.createdRooms, action.payload];
        state.joinedRooms = [...state.joinedRooms, action.payload];
      },
      joinRoomAction: (state, action) => {
        state.joinedRooms = [...state.joinedRooms, action.payload];
      },
      leaveRoomAction: (state, action) => {
        state.joinedRooms = state.joinedRooms.filter((room) => room?._id !== action.payload?._id);
        state.createdRooms = state.createdRooms.filter((room) => room?._id !== action.payload?._id);
      },
      setCurrentRoomAction: (state, action) => {
        state.currentRoom = action.payload;
      },
    },
  });

export const { setRoomsAction, createRoomAction, joinRoomAction, leaveRoomAction, setCurrentRoomAction } = roomSlice.actions;


export default roomSlice.reducer;
