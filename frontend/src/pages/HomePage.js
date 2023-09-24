import React from 'react';
import {Container } from '@mui/material';

import { useSelector } from 'react-redux';
import DefaultHomePage from './DefaultHomePage';
import RoomsOverviewPage from './RoomsOverviewPage';
import { RootState } from '../redux/store';

const HomePage = () => {
  const user = useSelector((state) => state.user?.user);

  return (
    <Container>
      {user ? <RoomsOverviewPage /> : <DefaultHomePage />}
    </Container>
  );
};

export default HomePage;