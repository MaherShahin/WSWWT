import * as React from 'react';
import { Box, Stack, Card, CardContent, CardActions, IconButton, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';
import './RoomBox.css';
import { useApi } from '../../hooks/useApi';
import { useDispatch } from 'react-redux';
import { leaveRoom } from '../../redux/room/roomSlice';
import RoomInvitationModal from '../RoomInvitationModal/RoomInvitationModal';


const RoomsBox = ({ room }) => {

  const LEAVE_ROOM_API_ENDPOINT = '/room/leave/';

  const navigate = useNavigate(); 
  const {request } = useApi();
  const dispatch = useDispatch();

  const goToRoom = () => {
    navigate(`/room/${room?._id}`);
  };
  

  const handleLeaveRoom = async (e) => {
    e.stopPropagation();

    // show confirmation dialog
    if (!window.confirm('Are you sure you want to leave' + room?.name + '?')) {
      return;
    }

    try {

        const response = await request({
          method: 'POST',
          url: LEAVE_ROOM_API_ENDPOINT + room?._id,
      });

      if (response.status === 200) {
        console.log('Successfully left room');
      } else {
        console.log('Failed to leave room');
      }

      dispatch(leaveRoom(room));
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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
        <RoomInvitationModal roomId={room?._id} />
      </CardActions>
    </Card>
  );
};


export default RoomsBox;
