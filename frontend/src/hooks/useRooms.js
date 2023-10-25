import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRoomsAction, leaveRoomAction, joinRoomAction, createRoomAction, setCurrentRoomAction } from '../redux/room/roomSlice';
import { useApi } from '../api/useApi';
import { fetchRoomsService, createRoomService } from '../services/roomsService';
import ApiResponse from '../api/ApiResponse';
import { useNavigate } from 'react-router-dom';



export const useFetchRooms = () => {
    const dispatch = useDispatch();
    const { request } = useApi();
    const { joinedRooms, createdRooms } = useSelector((state) => state.rooms);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchRoomsService(request);
                const rooms = response.getData();
                if (JSON.stringify(rooms) !== JSON.stringify({ joinedRooms, createdRooms })) {
                    dispatch(setRoomsAction(rooms));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return { joinedRooms, createdRooms };
};

export const useCreateRoom = () => {
    const dispatch = useDispatch();
    const { request } = useApi();
    const { navigate } = useNavigate();
    const createRoom = async (roomInfo) => {
        try {
            const response = await createRoomService(request, roomInfo);
            if (!response || !(response instanceof ApiResponse)) return;
            const room = response.getData();
            console.log("ROOM RESPONSE CLIENT"+room);
            dispatch(createRoomAction(room));
            navigate('/room/' + room._id)
            return response;
        } catch (e) {
            throw e;
        }
    };

    return { createRoom };
}

export const useGetRoomById = (roomId) => {
    const { request } = useApi();
    const dispatch = useDispatch();

    const fetchRoomById = async (roomId) => {
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

            const room = res.getData();
            if (room) {
                dispatch(setCurrentRoomAction(room));
            }

            return res;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    return { fetchRoomById };
}

export const useLeaveRoomById = () => {
    const { request } = useApi();
    const dispatch = useDispatch();

    const leaveRoomById = async (roomId) => {
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

            const room = res.getData();
            if (room) {
                dispatch(leaveRoomAction(room));
            }
            return res;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    return { leaveRoomById };
}

export const useJoinRoomById = () => {
    const { request } = useApi();
    const dispatch = useDispatch();

    const joinRoomById = async (roomId) => {
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

            const room = res.getData();

            dispatch(joinRoomAction(room));

            return res;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    return { joinRoomById };
}
