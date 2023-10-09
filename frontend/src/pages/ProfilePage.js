import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUser } from '../redux/user/userSlice';
import { useApi } from '../hooks/useApi';

const ProfilePage = () => {

    const user = useSelector((state) => state.user?.user);
    const [updatedUser, setUpdatedUser] = useState(user || null);
    
    const { request } = useApi();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleSave = async (event) => {
        event.preventDefault();

        try {
            const response = await request('put', '/user/update', updatedUser);
            console.log(response.data);
            const user = response.data;
            dispatch(updateUser(user));
            toast.success('User updated successfully');
        } catch (error) {
            toast.error(error.response.data.errors[0].msg);
            console.log(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (updatedUser) {
            setUpdatedUser({ ...updatedUser, [name]: value });
        }
    };


    return (
        <Container >
            <Typography variant="h4" gutterBottom >
                Profile
            </Typography>
            <Box
                component="form" onSubmit={handleSave}
            >
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    padding={2}
                    alignItems="center"
                    justifyContent="flex-start"
                    sx={{ minHeight: '100vh' }}
                >
                    <Stack spacing={2} sx={{ margin: '20px', width: '80%' }}>
                        <TextField
                            fullWidth
                            label="Username"
                            value={updatedUser?.username}
                            onChange={handleChange}
                            name="username"
                            disabled={true}

                        />

                        <TextField
                            label="Name"
                            fullWidth
                            value={updatedUser?.name}
                            onChange={handleChange}
                            name="name"
                        />

                        <TextField
                            label="Email"
                            fullWidth
                            value={updatedUser?.email}
                            onChange={handleChange}
                            name="email"
                            disabled={true}
                        />

                        <TextField
                            label="Bio"
                            fullWidth
                            value={updatedUser?.bio}
                            onChange={handleChange}
                            name="bio"
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                    </Stack>
                </Grid>
            </Box>
        </Container>
    );
}

export default ProfilePage;
