import React from 'react';
import {Container } from '@mui/material';

import { useSelector } from 'react-redux';
import { RootState } from '../interfaces/redux/RootState.interface';
import DefaultHomePage from './DefaultHomePage';
import LoggedInView from './LoggedInHomepage';

const HomePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user?.user);

  return (
    <Container>
      {user ? <LoggedInView /> : <DefaultHomePage />}
    </Container>
  );
};

export default HomePage;