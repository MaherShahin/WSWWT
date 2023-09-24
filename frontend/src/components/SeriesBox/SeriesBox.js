import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Box, Typography, Modal, Avatar } from '@mui/material';
import styles from './SeriesBox.module.css';
import {Stack} from '@mui/material';
import { removeSeries } from '../../redux/series/seriesSlice';

const SeriesBox = (props) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const series = props.series;

  const handleDelete = () => {
    dispatch(removeSeries(props.series));
    setShowModal(false); // Close modal after deletion
  };

  return (
    <Box className={styles.seriesBox} position="relative">
      <Avatar
        src={series.image || 'path_to_placeholder.jpg'}
        alt={series.title}
        variant="square"
        className={styles.avatar}
        style={{ width: '100%', height: '95%' }}
      />

      <Button
        className={styles.deleteButton}
        onClick={() => setShowModal(true)}
        sx={{
          position: 'absolute',
          top: 10,
          right: 5,
          backgroundColor: 'transparent',
          color: '#333', 
          fontSize: '1rem', 
          '&:hover': {
            backgroundColor: 'red',
            color: 'white'
          }
        }}
      >
        x
      </Button>

      <Box className={styles.bottomBox} >
        <Typography className={styles.title} >
          {series.title}
        </Typography>
      </Box>

      <Stack spacing={2} >
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={styles.modalBox}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Confirm Deletion
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to delete {series.title}?
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button color="error" onClick={handleDelete}>
                Confirm
              </Button>
              <Button color="primary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>

      </Stack>

    </Box>
  );
};

export default SeriesBox;
