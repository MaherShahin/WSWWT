import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, Grid, Avatar } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import GroupIcon from '@mui/icons-material/Group';
import RoomIcon from '@mui/icons-material/Room';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const styles = {
    card: {
        padding: 10,
        margin: 10,
        textAlign: 'center',
    },
    avatar: {
        margin: 'auto',
        backgroundColor: '#3f51b5',
        color: 'white',
    },
};

const UserStats = () => {
    const user = useSelector((state) => state.user);
    const rooms = useSelector((state) => state.rooms);

    const stats = [
        { label: 'Media Added', value: user.moviesAdded || 0, icon: <MovieIcon /> },
        { label: 'Friends', value: user.friendsCount || 0, icon: <GroupIcon /> },
        { label: 'Rooms Created', value: rooms?.createdRooms?.length || 0, icon: <RoomIcon /> },
        { label: 'Rooms Joined', value: rooms?.joinedRooms?.length || 0, icon: <AddCircleIcon /> },
    ];

    return (
        <>
        <Typography variant="h4">Dashboard</Typography>
        <Grid container spacing={2}>
            {stats.map((stat, index) => (
                <Grid item xs={3} key={index}>
                    <Card style={styles.card} elevation={4}>
                        <Avatar style={styles.avatar}>{stat.icon}</Avatar>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {stat.value}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {stat.label}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
        </>
    );
};

export default UserStats;
