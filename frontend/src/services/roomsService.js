import ApiResponse from '../api/ApiResponse';

export const fetchRoomsService = async (request) => {
    const ROOMS_API_ENDPOINT = '/user/rooms';

    try {
        const res = await request({
            method: 'get',
            url: ROOMS_API_ENDPOINT,
        });

        if (!res || !(res instanceof ApiResponse)) {
            console.log('could not fetch rooms');
            return;
        }

        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const createRoomService = async (request, roomInfo) => {
    const CREATE_ROOM_API_ENDPOINT = '/room/create';

    try {
        const res = await request({
            method: 'post',
            url: CREATE_ROOM_API_ENDPOINT,
            data: roomInfo,
        });

        if (!res || !(res instanceof ApiResponse)) {
            console.log('could not create room');
            return;
        }

        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const fetchRoomByIdService = async (request, roomId) => {
    const ROOM_API_ENDPOINT = '/room/' + roomId;

    try {
        const res = await request({
            method: 'GET',
            url: ROOM_API_ENDPOINT,
        });

        if (!res || !(res instanceof ApiResponse)) {
            console.log('could not fetch room');
            return;
        }

        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const leaveRoomByIdService = async (request, roomId) => {
    const LEAVE_ROOM_API_ENDPOINT = '/room/' + roomId + '/leave';

    try {
        const res = await request({
            method: 'POST',
            url: LEAVE_ROOM_API_ENDPOINT,
        });

        if (!res || !(res instanceof ApiResponse)) {
            console.log('could not leave room');
            return;
        }

        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const joinRoomByIdService = async (request, roomId) => {
    const JOIN_ROOM_API_ENDPOINT = '/room/' + roomId + '/join';

    try {
        const res = await request({
            method: 'POST',
            url: JOIN_ROOM_API_ENDPOINT,
        });

        if (!res || !(res instanceof ApiResponse)) {
            console.log('could not join room');
            return;
        }

        return res;
    } catch (error) {
        console.log(error);
        throw error;
    }
}