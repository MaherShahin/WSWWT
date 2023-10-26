import React, { useEffect, useState } from 'react';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { useGetFriendRequests, useAcceptFriendRequest, useRejectFriendRequest } from '../../hooks/useFriendRequests'; // Import your custom hooks
import { useDispatch, useSelector } from 'react-redux';
import { setFriendRequests } from '../../redux/user/userUtilsSlice';

const NotificationsDropDown = () => {

  const [ anchorEl, setAnchorEl ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  
  const dispatch = useDispatch ();

  const friendRequests = useSelector((state) => state.friendRequests ?? []);

  const { fetchFriendRequests } = useGetFriendRequests(); 
  const { acceptRequest } = useAcceptFriendRequest(); 
  const { rejectRequest } = useRejectFriendRequest();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };  

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAcceptFriendRequest = async (friendId) => {
    const success = await acceptRequest(friendId); 
    if (success) {
      console.log('Friend request accepted');
    } else {
      console.log('Error accepting friend request');
    }
  };

  const handleRejectFriendRequest = async (friendId) => {
    const success = await rejectRequest(friendId);
    if (success) {
      console.log('Friend request accepted');
    } else {
      console.log('Error rejecting friend request');
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      //TODO: Figure out a better way than just repeatedly fetching and showing an error if it fails
      //stuck in an endless annoying loop that way
      const friendRequests = await fetchFriendRequests();
      console.log('friendRequests: ', friendRequests);
      dispatch(setFriendRequests(friendRequests));
    }, 513531);
    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <Button onClick={handleOpen}>
        <Notifications style={{ color: 'white' }} />
      </Button>
      <Menu
        id="friend-requests-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {loading && <MenuItem disabled={true}>Loading...</MenuItem>}
        {!loading && friendRequests.length === 0 && (
          <MenuItem disabled={true}>
            <Typography >No new notifications</Typography>
          </MenuItem>
        )}
        {!loading && friendRequests.length > 0 && friendRequests.map((request) => (
          <MenuItem key={request.id}>
            <Typography>{`${request.from} wants to be friends.`}</Typography>
            <Button onClick={() => handleAcceptFriendRequest(request.id)}>Accept</Button>
            <Button onClick={() => handleRejectFriendRequest(request.id)}>Reject</Button>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NotificationsDropDown;
