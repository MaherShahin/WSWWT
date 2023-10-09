import React, { useState, useRef } from 'react';
import { Modal, Box, Typography, IconButton, Tooltip, TextField, Button } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const RoomInvitationModal = ({ roomId }) => {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const textAreaRef = useRef(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const joinLink = window.location.origin + '/join-room/' + roomId;

    const copyToClipboard = (e) => {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <Tooltip title="Generate Join Link">
                <IconButton color="primary" onClick={handleOpen}>
                    <ShareIcon fontSize="large" />
                </IconButton>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box 
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <IconButton 
                        aria-label="close" 
                        onClick={handleClose} 
                        sx={{ position: 'absolute', right: 10, top: 10 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Invite Link
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, width: '100%' }}>
                        <TextField 
                            id="joinLink"
                            variant="outlined"
                            value={joinLink}
                            inputRef={textAreaRef}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <Tooltip title={copied ? "Copied!" : "Copy to Clipboard"}>
                            <IconButton onClick={copyToClipboard}>
                                <FileCopyIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default RoomInvitationModal;
