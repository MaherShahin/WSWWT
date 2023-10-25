import ApiResponse from "../api/ApiResponse";

const GET_FRIEND_REQUESTS_ENDPOINT = '/friend/getFriendRequests';
const SEND_FRIEND_REQUEST_ENDPOINT = '/friend/sendFriendRequest';
const ACCEPT_FRIEND_REQUEST_ENDPOINT = '/friend/acceptFriendRequest';
const REJECT_FRIEND_REQUEST_ENDPOINT = '/friend/rejectFriendRequest';
const REMOVE_FRIEND_ENDPOINT = '/friend/removeFriend';

export const getFriendRequests = async (request) => {

    try {
        const res = await request({
            method: 'GET',
            url: GET_FRIEND_REQUESTS_ENDPOINT,
        });

        if (!res || !(res instanceof ApiResponse)) {
            console.log('could not get friend requests');
            return;
        }

        return res;
    } catch (error) {
        console.error('Error fetching friend requests:', error);
        throw error;
    }
};

export const acceptFriendRequest = async (request, friendId) => {
    try {
        const res = await request({
            method: 'POST',
            url: ACCEPT_FRIEND_REQUEST_ENDPOINT,
            data: {
                friendId,
            },
        });

        if (!res) {
            console.log('could not accept friend request');
            return;
        }

        return res;
    } catch (error) {
        console.error('Error accepting friend request:', error);
        throw error;
    }
};

export const rejectFriendRequest = async (request, friendId) => {
    try {
        const res = await request({
            method: 'POST',
            url: REJECT_FRIEND_REQUEST_ENDPOINT,
            data: {
                friendId,
            },
        });

        if (!res.data.user){
            return null;
        }

        return res;
    } catch (error) {
        console.error('Error rejecting friend request:', error);
        throw error;
    }
};

export const sendFriendRequest = async (request, friendId) => {
    try {
        const res = await request({
            method: 'POST',
            url: SEND_FRIEND_REQUEST_ENDPOINT,
            data: {
                friendId,
            },
        });

        if (!res) {
            console.log('could not send friend request');
            return;
        }

        return res;
    } catch (error) {
        console.error('Error sending friend request:', error);
        throw error;
    }
};

export const removeFriend = async (request, friendId) => {
    try {
        const res = await request({
            method: 'POST',
            url: REMOVE_FRIEND_ENDPOINT,
            data: {
                friendId,
            },
        });

        if (!res) {
            console.log('could not remove friend');
            return;
        }
        
        return res;
    } catch (error) {
        console.error('Error removing friend:', error);
        throw error;
    }
};
