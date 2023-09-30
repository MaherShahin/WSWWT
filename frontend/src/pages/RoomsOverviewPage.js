import React from 'react';
import RoomsOverview from '../components/RoomsOverview/RoomsOverview';
import UserStats from '../components/UserStats/UserStats';
import { Stack } from '@mui/material';

const RoomsOverviewPage = () => {

  return (
    <Stack spacing={2} direction="column" marginTop={3}>
      <UserStats />
      <RoomsOverview />
    </Stack>
  );
};

export default RoomsOverviewPage;
