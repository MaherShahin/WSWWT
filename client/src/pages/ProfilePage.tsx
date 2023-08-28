import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import { IUser } from '../interfaces/user/IUser.interface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../interfaces/redux/RootState.interface';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateUser } from '../redux/user/userActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage: React.FC = () => {

    const user = useSelector((state: RootState) => state.user?.user);
    const [updatedUser, setUpdatedUser] = useState<IUser | null>(user || null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        try {
            const response = await axios.post(`http://localhost:5000/api/user/update`, updatedUser);
            console.log(response.data);
            const user  = response.data as IUser;
            dispatch(updateUser(user));
            toast.success('User updated successfully');
        } catch (error: any) {
            toast.error(error.response.data.errors[0].msg);
            console.log(error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (updatedUser) {
            setUpdatedUser({ ...updatedUser, [name]: value });
        }
    };


    if (!user) {
        return null;
    }

    return (
        <Container >
            <ToastContainer />

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
};

export default ProfilePage;
