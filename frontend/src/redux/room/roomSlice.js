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
        'setRooms': (state, action) => {
            state.joinedRooms = action.payload.joinedRooms;
            state.createdRooms = action.payload.createdRooms;
        },
        'createRoom': (state, action) => {
            state.createdRooms.push(action.payload);
        },
        'joinRoom': (state, action) => {
            state.joinedRooms.push(action.payload);
        },
        'leaveRoom': (state, action) => {
            state.joinedRooms = state.joinedRooms.filter((room) => room?._id !== action.payload?._id);
        },
    }
});


export const { setRooms, createRoom, joinRoom, leaveRoom } = userSlice.actions;


export default userSlice.reducer;
