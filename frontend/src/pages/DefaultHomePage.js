import React from 'react';
import { Button, Typography, Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const Hero = styled(Box)(() => ({
  height: '90vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
}));

const DefaultHomePage = () => {
  return (
    <Hero>
      <Typography variant="h2" gutterBottom color="textPrimary">
        What Should We Watch Tonight?
      </Typography>
      <Typography variant="h6" gutterBottom color="textSecondary">
        Your ultimate guide to pick the best shows for the night.
      </Typography>
      <Stack direction="row" spacing={2}>
          <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              component={Link} 
              to="/login"
          >
              Login
          </Button>
          <Button 
              variant="contained" 
              color="secondary" 
              size="large" 
              component={Link} 
              to="/register"
          >
              Register
          </Button>
      </Stack>
    </Hero>
  );
};

export default DefaultHomePage;
