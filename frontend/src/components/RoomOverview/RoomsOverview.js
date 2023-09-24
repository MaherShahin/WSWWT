import React from 'react';
import { Box, Button, Stack, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RoomBox from '../RoomBox/RoomBox';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const RoomsOverview = () => {

    const { joinedRooms, createdRooms } = useSelector((state) => state.rooms);
    
    const navigate = useNavigate();
    const handleCreateRoom = () => {
        navigate('/create-room');
    };

    return (
        <Stack spacing={2} direction="column" marginTop={3}>
            <Box display={'flex'} justifyContent={'flex-end'}>
                <Button variant="contained" color="primary" onClick={handleCreateRoom}>
                    Create a new Room
                </Button>
            </Box>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h4">Created Rooms</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List style={{ width: '100%' }}>
                        {createdRooms.map((room, index) => (
                            <ListItem key={index}>
                                <RoomBox room={room} />
                            </ListItem>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h4">Joined Rooms</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List style={{ width: '100%' }}>
                        {joinedRooms.map((room, index) => (
                            <ListItem key={index}>
                                <RoomBox room={room} />
                            </ListItem>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
        </Stack>
    );
}

export default RoomsOverview;
