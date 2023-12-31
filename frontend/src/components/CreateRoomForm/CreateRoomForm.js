import { Button, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Stack, Switch, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ApiResponse from '../../api/ApiResponse';
import { createRoomAction } from '../../redux/room/roomSlice';
import { useCreateRoom } from '../../hooks/useRooms';

const CreateRoomForm = () => {

    const RoomType = {
        PUBLIC: 'public',
        PRIVATE: 'private'
    }

    const [roomName, setRoomName] = useState('');
    const [description, setDescription] = useState('');
    const [roomType, setRoomType] = useState(RoomType.PUBLIC);
    const [password, setPassword] = useState('');
    const [maxParticipants, setMaxParticipants] = useState(1);

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const { createRoom } = useCreateRoom();

    const validateForm = () => {
        const newErrors = {};

        if (!roomName) {
            newErrors.roomName = 'roomName is required';
        }

        if (!description) {
            newErrors.description = 'Description is required';
        }

        if (roomType === RoomType.PRIVATE && !password) {
            newErrors.password = 'Password is required for private rooms';
        }

        if (roomType === RoomType.PRIVATE && password && password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (maxParticipants < 1 || maxParticipants > 25) {
            newErrors.maxParticipants = 'Max participants must be between 1 and 25';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async () => {
        if (!validateForm()) return;

        const roomInfo = {
            name: roomName,
            description: description,
            roomType: roomType,
            maxParticipants: maxParticipants,
            password: password ? password : null
        };

        try {
            await createRoom(roomInfo);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Stack spacing={2} direction="column" marginTop={3} alignContent={'center'}>
                <Typography variant="h4" gutterBottom color="textPrimary">
                    Create a new Room!
                </Typography>
                <FormControl>
                    <FormLabel component="legend">Room Name</FormLabel>
                    <TextField id="roomName"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        error={errors.roomName ? true : false}
                        helperText={errors.roomName}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel component="legend">Description</FormLabel>
                    <TextField id="description"
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        error={errors.description ? true : false}
                        helperText={errors.description}
                    />

                </FormControl>
                <FormGroup>
                    <FormLabel component="legend">Room Type</FormLabel>
                    <FormControlLabel required control={
                        <Switch
                            value={roomType.valueOf()}
                            onChange={(e) => setRoomType(e.target.checked ? RoomType.PRIVATE : RoomType.PUBLIC)}
                        />}
                        label={roomType} />
                </FormGroup>
                <FormGroup>
                    {roomType === RoomType.PRIVATE ? (
                        <FormControl>
                            <FormLabel component="legend">Password</FormLabel>
                            <TextField id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={errors.password ? true : false}
                                helperText={errors.password}
                            />

                        </FormControl>
                    ) : null
                    }
                </FormGroup>
                <FormControl>
                    <FormLabel component="legend">Max Participants</FormLabel>
                    <TextField
                        id="maxParticipants"
                        type="number"
                        InputProps={{
                            inputProps: {
                                min: 1,
                                max: 25
                            }
                        }}
                        value={maxParticipants}
                        onChange={(e) => setMaxParticipants
                            (Number(e.target.value))}
                        error={errors.maxParticipants ? true : false}
                        helperText={errors.maxParticipants}
                    />
                </FormControl>

                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Create
                </Button>
            </Stack>
        </>
    );


}

export default CreateRoomForm;