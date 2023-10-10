import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CreateRoomForm from '../CreateRoomForm/CreateRoomForm';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import  { IconButton, Tooltip } from '@mui/material';   


const CreateRoomModal = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Tooltip title="Create a New Room">
                <IconButton color="primary" onClick={handleOpen}>
                    <AddCircleOutlineIcon fontSize="large" />

                </IconButton>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50vh',
                        height: '50vh',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <CreateRoomForm />
                </Box>
            </Modal>
        </>
    );
}

export default CreateRoomModal;
