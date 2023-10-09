import React from 'react';
import { Box, Stack, Tooltip, IconButton } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useSelector } from 'react-redux';
import { setRooms } from '../../redux/room/roomSlice';
import { useApi } from '../../hooks/useApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import RoomsAccordion from '../RoomsAccordion/RoomsAccordion';
import CreateRoomModal from '../CreateRoomModal/CreateRoomModal';


const RoomsOverview = () => {

    const ROOMS_API_ENDPOINT = '/user/rooms';

    const { joinedRooms, createdRooms } = useSelector((state) => state.rooms);

    const { request } = useApi();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRooms = async () => {
            const response = await request({
                method: 'get',
                url: ROOMS_API_ENDPOINT,
            });

            if (response.status === 200) {
                const rooms = response.data.rooms;
                if (JSON.stringify(rooms) !== JSON.stringify({ joinedRooms, createdRooms })) {
                    dispatch(setRooms(rooms));
                }
            }
        };

        fetchRooms();
    }, []); 

    const handleJoinRoom = () => {
        return;
    }

    return (
        <Stack spacing={2} direction="column" marginTop={3} >
            <Box display={'flex'} padding={3}>
                <Box>
                    <CreateRoomModal />
                    <Tooltip title="Join a Room">
                        <IconButton color="secondary" onClick={handleJoinRoom}>
                            <GroupAddIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <RoomsAccordion title="Created Rooms" rooms={createdRooms} />
            <RoomsAccordion title="Joined Rooms" rooms={joinedRooms} />
        </Stack>
    );
}

export default RoomsOverview;
