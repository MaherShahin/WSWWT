import React from 'react';
import { Typography } from '@mui/material';

const LoggedInView: React.FC = () => {
  return (
    <>
      <Typography variant="h2" gutterBottom color="textPrimary">
      Your Rooms
      </Typography>
      {/* Render the list of rooms the user is in */}
    </>
  );
};

export default LoggedInView;
