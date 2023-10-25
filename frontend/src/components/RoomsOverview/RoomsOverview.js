import React from 'react';
import { Box, Stack } from '@mui/material';
import RoomsAccordion from '../RoomsAccordion/RoomsAccordion';
import CreateRoomModal from '../CreateRoomModal/CreateRoomModal';
import UserSearchModal from '../UserSearchModal/UserSearchModal';
import { useFetchRooms } from '../../hooks/useRooms';


const RoomsOverview = () => {

    const { joinedRooms, createdRooms } = useFetchRooms();

    return (
        <Stack spacing={2} direction="column" marginTop={3} >
            <Box display={'flex'} padding={3}>
                <Box>
                    <CreateRoomModal />
                    <UserSearchModal />
                </Box>
            </Box>
            <RoomsAccordion title="Created Rooms" rooms={createdRooms} />
            <RoomsAccordion title="Joined Rooms" rooms={joinedRooms} />
        </Stack>
    );
}

export default RoomsOverview;
