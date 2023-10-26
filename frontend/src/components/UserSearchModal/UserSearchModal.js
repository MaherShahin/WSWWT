import React, { useState } from 'react';
import { IconButton, Tooltip, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, Box, Typography, Container, CssBaseline, CircularProgress } from '@mui/material';
import { InsertEmoticonOutlined } from '@mui/icons-material';
import { useApi } from '../../api/useApi';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';

const UserSearchModal = () => {

    const USER_SEARCH_ENDPOINT = '/user/search';
    const USER_FRIEND_REQUEST_ENDPOINT = '/friend/sendFriendRequest';

    const userFriends = useSelector(state => state.user?.user.friends);

    const [open, setOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addFriendLoading, setAddFriendLoading] = useState(false);

    const { request } = useApi();

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
            console.log(res.data);
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
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <InsertEmoticonOutlined fontSize="large" />
                        <Typography variant="body1" marginTop={1} color={'white'}>Find Friends</Typography>
                    </Box>
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
                        boxShadow: 2,
                        p: 4,
                        borderRadius: '50px',
                    }}
                >
                    <Typography variant="h5" gutterBottom color="textPrimary" align='center'>
                        Find Friends
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter the name or id of your friend"
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
