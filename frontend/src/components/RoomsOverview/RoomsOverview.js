import React from 'react';
import { Box, Button, Stack, Tooltip, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setRooms } from '../../redux/room/roomSlice';
import { useApi } from '../../hooks/useApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import RoomsAccordion from '../RoomsAccordion/RoomsAccordion';


const RoomsOverview = () => {

    const ROOMS_API_ENDPOINT = '/user/rooms';

    const { joinedRooms, createdRooms } = useSelector((state) => state.rooms);

    const { request } = useApi();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchRooms = async () => {
            const response = await request({
                method: 'get',
                url: ROOMS_API_ENDPOINT,
            });
            if (response.status === 200) {
                const rooms = response.data.rooms;
                console.log(rooms);
                dispatch(setRooms(rooms));
            }
        }
        fetchRooms();
    }, []);

    const handleCreateRoom = () => {
        navigate('/create-room');
    };

    const handleJoinRoom = () => {
        return;
    }

    return (
        <Stack spacing={2} direction="column" marginTop={3} >
            <Box display={'flex'} padding={3}>
                <Box>
                    <Tooltip title="Create a New Room">
                        <IconButton color="primary" onClick={handleCreateRoom}>
                            <AddCircleOutlineIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
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
