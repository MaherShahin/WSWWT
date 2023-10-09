import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useApi } from '../hooks/useApi';

const JoinRoomPage = () => {
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
    };

    const joinRoom = async () => {
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
        setOpen(false);
    };


    const handleJoin = () => {
        if (room.roomType === 'public') {
            joinRoom();
        }

        if (room.roomType === 'private') {
            if (password === '') {
                toast.error('Please enter a password.');
                return;
            }
            joinRoom();
        }

        console.log(`Joined room with ID: ${roomId}`);
        // Add password validation here for private rooms if needed
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
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
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h2>Do you want to join {room?.name}?</h2>
                        </Grid>
                        {room?.roomType === 'private' && (
                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                        )}
                        <Grid item xs={6}>
                            <Button
                                onClick={handleJoin}
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Join
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                onClick={handleClose}
                                variant="contained"
                                color="secondary"
                                fullWidth
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
};

export default JoinRoomPage;
