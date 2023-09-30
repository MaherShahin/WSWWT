import React, { useState, useEffect } from 'react';
import { Button, Box, Container, Typography } from '@mui/material';
import RoomUsers from '../components/RoomUsers/RoomUsers';
import { useApi } from '../hooks/useApi';  // Importing the API hook
import ContentSection from '../components/ContentSection/ContentSection';

const Room = () => {
    const [users, setUsers] = useState([]);  // To hold the users
    const { request } = useApi();  // The API request function
    const [contentItems, setContentItems] = useState([]);  // New state for content items

    useEffect(() => {
        // This is where you would make an API request to fetch the users
        // For now, let's use a placeholder

        // API request would look something like this:
        // const response = await request({method: 'GET', url: '...'});
        // setUsers(response.data.users);

        // Placeholder users data
        setUsers([
            {id: 1, name: 'Alice', avatar: '/path/to/avatar1.png'},
            {id: 2, name: 'Bob', avatar: '/path/to/avatar2.png'},
            // ...more users
        ]);

        setContentItems([
            { title: 'Inception', type: 'Movie' },
            { title: 'Breaking Bad', type: 'Series' },
        ]);
    }, []);

    const viewProfile = (userId) => {
        console.log('Viewing profile of user:', userId);
        // Here you can navigate to the user's profile page or open a profile modal
    };

    return (
        <Container>
            <Typography variant="h4" align="justify-left" paddingTop={3} gutterBottom>
                Room Name
            </Typography> 
            <RoomUsers users={users} viewProfile={viewProfile} />
            <ContentSection contentItems={contentItems}/>
            {/* We'll add more sections here later */}
            <Box display="flex" justifyContent="space-around" padding={3}>
            <Button variant="contained" color="primary">
                Add Content
            </Button>
            <Button variant="contained" color="secondary" >
                Remove Content
            </Button>
        </Box>
        </Container>
    );
};

export default Room;
