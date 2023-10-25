import React, { useState, useEffect } from 'react';
import { Button, Box, Container, Typography } from '@mui/material';
import RoomUsers from '../components/RoomUsers/RoomUsers';
import { useApi } from '../api/useApi';  // Importing the API hook
import ContentSection from '../components/ContentSection/ContentSection';
import {useParams} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {setCurrentRoomAction } from '../redux/room/roomSlice';
import RoomInvitationModal from '../components/RoomInvitationModal/RoomInvitationModal';

const Room = () => {

    const params= useParams();

    const ROOM_API_ENDPOINT = '/room/' + params.id; 

    const { currentRoom } = useSelector((state) => state.rooms);

    const [users, setUsers] = useState([]);
    const { request } = useApi();  
    const [contentItems, setContentItems] = useState([]);
    const [roomName, setRoomName] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRoom = async () => {
            console.log(params.id);
            const response = await request({
                method: 'GET',
                url: ROOM_API_ENDPOINT,
            });

            let room = response.data;
            dispatch(setCurrentRoomAction(room));
        }
        fetchRoom();
    }, []);

    useEffect(() => {
        if (!currentRoom) {
            return;
        }

        setUsers(currentRoom.users);

        const contentItem1 = {
            _id: '1',
            title: 'Content Item 1',
            description: 'This is the first content item',
        };

        const contentItem2 = {
            _id: '2',
            title: 'Content Item 2',
            description: 'This is the second content item',
        };

        const contentItems = [contentItem1, contentItem2];
        setContentItems(contentItems);
        setRoomName(currentRoom.name);
    }, [currentRoom]);


    return (
        <Container>
            <Typography variant="h4" align="justify-left" paddingTop={3} gutterBottom>
                {roomName}
            </Typography> 
            <RoomUsers users={users} />
            <ContentSection contentItems={contentItems}/>
            <Box display="flex" justifyContent="space-around" padding={3}>
            <Button variant="contained" color="primary">
                Add Content
            </Button>
            <Button variant="contained" color="secondary" >
                Remove Content
            </Button>
            <RoomInvitationModal roomId={params.id}/>
        </Box>
        </Container>
    );
};

export default Room;
