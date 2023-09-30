import React from 'react';
import { Box, Tooltip, Avatar } from '@mui/material';

const RoomUsers = ({ users, viewProfile }) => {
    return (
        <Box display="flex" alignItems="center" padding={2}>
            {users.map((user, index) => (
                <Tooltip title={user.name} key={index}>
                    <Avatar 
                        src={user.avatar} 
                        onClick={() => viewProfile(user.id)}
                        style={{marginRight: '10px'}}
                    />
                </Tooltip>
            ))}
        </Box>
    );
};

export default RoomUsers;
