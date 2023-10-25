import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notifications: [],
    friendRequests: [],
    roomInvites: [], 
};

const userUtils = createSlice({
  name: 'userUtils',
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      if (action.payload.length === 0) {
        state.notifications = [];
        return;
      }
      state.notifications.push(action.payload);
    },
    setFriendRequests: (state, action) => {
      if (action.payload.length > 0) {
        state.friendRequests = action.payload;
        return;
      }
      console.log('Setting friend requests:', action.payload);
      state.friendRequests = [];
    },
    addFriendRequest: (state, action) => {
      const index = state.friendRequests.findIndex(request => request.id === action.payload.id);
      if (index === -1) {
        state.friendRequests.push(action.payload);
      }
    },
    removeFriendRequest: (state, action) => {
      const index = state.friendRequests.findIndex(request => request.id === action.payload.id);
      if (index !== -1) {
        state.friendRequests.splice(index, 1);
      }
    },
    addRoomInvite: (state, action) => {
      const index = state.roomInvites.findIndex(invite => invite.id === action.payload.id);
      if (index === -1) {
        state.roomInvites.push(action.payload);
      }
    },
    removeRoomInvite: (state, action) => {
      const index = state.roomInvites.findIndex(invite => invite.id === action.payload.id);
      if (index !== -1) {
        state.roomInvites.splice(index, 1);
      }
    },
  }
});

export const { setNotifications, setFriendRequests, addFriendRequest, removeFriendRequest, addRoomInvite, removeRoomInvite } = userUtils.actions;

export default userUtils.reducer;