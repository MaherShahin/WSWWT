import * as React from 'react';
import { Box, Stack } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import './RoomBox.css';
import { authenticatedRequest } from '../../api/api';
import ShareIcon from '@mui/icons-material/Share';

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
    <Stack spacing={2} direction="row" 
      className='room-box'
      id= {'room-box-' + room?._id} 
      onClick={goToRoom}
    >
      <Box width={1 / 4} >
        {room?.name}
      </Box>
      <Box width={1 / 4}>
        {room?.users.length} / {room.maxParticipants}
      </Box>
      <Box width={1 / 4}>
        {room?.roomType === 'private' ? 'Private' : 'Public'}
      </Box>
      <Box width={1/8}>
        <LogoutIcon onClick={handleLeaveRoom} className='leave-icon' id='leave-icon' />
      </Box>
      <Box>
        <ShareIcon onClick={handleShareIcon} className='share-icon' id='share-icon' />
      </Box>
    </Stack>
  );
};

export default RoomsBox;
