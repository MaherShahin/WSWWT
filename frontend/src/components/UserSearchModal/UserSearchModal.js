import React, { useState } from 'react';
import { IconButton, Tooltip, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, Box, Typography, Container, CssBaseline, CircularProgress } from '@mui/material';
import { InsertEmoticonOutlined } from '@mui/icons-material';
import { useApi } from '../../hooks/useApi';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import { addFriend } from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';

const UserSearchModal = () => {

    const USER_SEARCH_ENDPOINT = '/user/search';
    const USER_FRIEND_REQUEST_ENDPOINT = '/user/addFriend';

    const userFriends = useSelector(state => state.user?.user.friends);

    const [open, setOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addFriendLoading, setAddFriendLoading] = useState(false);

    const { request } = useApi();
    const dispatch = useDispatch();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSearch = async (query) => {
        setLoading(true);
        try {
            const res = await request({
                method: 'GET',
                url: `${USER_SEARCH_ENDPOINT}?q=${query}`,
            });
            setSearchResults(res.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const sendFriendRequest = async (friendId) => {
        console.log('sending friend request to', friendId);
        setAddFriendLoading(true);
        try {
            const res = await request({
                method: 'POST',
                url: USER_FRIEND_REQUEST_ENDPOINT,
                data: {
                    friendId,
                },
            });
            
            if (res.data.success) {
                dispatch(addFriend(friendId))
                console.log(res.data);    
            }
        } catch (error) {
            console.log(error);
        }
        setAddFriendLoading(false);
        return;
    };

    return (
        <>
            <Tooltip title="Add a Friend">
                <IconButton color="secondary" onClick={handleOpen}>
                    <InsertEmoticonOutlined fontSize="large" />
                </IconButton>
            </Tooltip>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search for friends..."
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <List>
                        {loading ? <CircularProgress size={24} /> : searchResults.map(user => (
                            <ListItem key={user._id}>
                                <ListItemText primary={user.name} />
                                <ListItemSecondaryAction>
                                    {addFriendLoading ? (
                                        <CircularProgress size={24} />
                                    ) : userFriends.includes(user._id) ? (
                                        <Typography variant="body2">Already Friends</Typography>
                                    ) : (
                                        <Button onClick={() => sendFriendRequest(user._id)}>Add Friend</Button>
                                    )}
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>

                </Box>
            </Modal>
        </>
    );
};

export default UserSearchModal;
