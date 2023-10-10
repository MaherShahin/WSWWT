import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useApi } from '../../hooks/useApi';
import JoinRoomForm from '../JoinRoomForm/JoinRoomForm';

const JoinRoomModal = () => {
    const { roomId } = useParams();
    const [room, setRoom] = useState(null);
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const user = useSelector((state) => state.user?.user);
    const { request } = useApi();

    useEffect(() => {
        if (!user) {
            sessionStorage.setItem('redirectAfterLogin', `/join-room/${roomId}`);
            navigate('/login');
            toast.error('You must be logged in to join a room.');
            return;
        }
        fetchRoom();
        setOpen(true);
    }, [user]);

    const fetchRoom = async () => {
        try {
            const response = await request({
                method: 'GET',
                url: `/room/${roomId}`,
            });
    
            if (!response) {
                console.log('No response');
                toast.error('Could not find the room.');
                return;
            }
    
            const room = response.data;
            setRoom(room);
        } catch (error) {
            console.log(error);
        }
    };

    const joinRoom = async () => {
        try {
            const response = await request({
                method: 'POST',
                url: `/room/join/${roomId}`,
                data: {
                    password,
                },
            });
    
            if (!response) {
                return;
            }
    
            const room = response.data.room;
    
            if (!room) {
                return;
            }
    
            navigate(`/room/${room._id}`);
            toast.success(`Joined room ${room.name}`);
        } catch (error) {
            console.log(error);
        }
        setOpen(false);
    };


    const handleJoin = () => {
        if (room.roomType === 'private' && password !== '') {
            toast.error('Please enter a password.');
            return;
        }
        joinRoom();

        console.log(`Joined room with ID: ${roomId}`);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <JoinRoomForm room={room} password={password} setPassword={setPassword} handleJoin={handleJoin} />
            </Box>
        </Modal>
    );
};

export default JoinRoomModal;
