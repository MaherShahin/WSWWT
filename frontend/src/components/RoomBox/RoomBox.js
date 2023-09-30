import * as React from 'react';
import { Box, Stack, Card, CardContent, CardActions, IconButton, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ShareIcon from '@mui/icons-material/Share';
import RoomIcon from '@mui/icons-material/Room'; // Example, replace with the actual icon
import { useNavigate } from 'react-router-dom';
import { authenticatedRequest } from '../../api/api';
import './RoomBox.css';


const RoomsBox = ({ room }) => {

  const LEAVE_ROOM_API_ENDPOINT = '/room/leave';

  const navigate = useNavigate(); 

  const goToRoom = () => {
    navigate(`/room/${room?._id}`);
  };
  

  const handleLeaveRoom = async (e) => {
    e.stopPropagation();
    try {
      const response = await authenticatedRequest('post', LEAVE_ROOM_API_ENDPOINT.concat(`/${room?._id}`));
      if (response.status === 200) {
        console.log('Successfully left room');
      } else {
        console.log('Failed to leave room');
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShareIcon = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href.concat(`room/${room?._id}`));
  }

  return (
    <Card elevation={3} className='room-box' onClick={goToRoom}>
      <CardContent>
        <Stack spacing={2} direction="row">
          <Box flexGrow={1}>
            <Typography variant="h6">{room?.name}</Typography>
            <Typography color="textSecondary">{room?.users.length}/{room?.maxParticipants} Participants</Typography>
            <Typography color="textSecondary">{room?.roomType === 'private' ? 'Private' : 'Public'}</Typography>
          </Box>
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="leave" onClick={handleLeaveRoom}>
          <LogoutIcon />
        </IconButton>
        <IconButton aria-label="share" onClick={handleShareIcon}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};


export default RoomsBox;
