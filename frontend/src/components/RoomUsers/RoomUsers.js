import React from 'react';
import { Box, Tooltip, Avatar } from '@mui/material';

const RoomUsers = ({ users }) => {

    const viewProfile = (user) => {
        console.log('Viewing profile of user:', user);
    };

    return (
        <Box display="flex" alignItems="center" padding={2}>
            {users.map((user, index) => (
                <Tooltip title={user.name} key={index}>
                    <Avatar 
                        src={user.avatar} 
                        onClick={() => viewProfile(user.name)}
                        style={{marginRight: '10px'}}
                    />
                </Tooltip>
            ))}
        </Box>
    );
};

export default RoomUsers;
