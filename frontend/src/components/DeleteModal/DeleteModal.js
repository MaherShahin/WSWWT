import React from 'react';
import { Modal, Typography, Button } from '@mui/material';

const DeleteModal = ({ open, title, onClose, onConfirm }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-description"
        >
            <div
                style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    position: "absolute",
                    width: 400,
                    backgroundColor: "#323232",
                    padding: "20px",
                    outline: "none",
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Are you sure you want to delete {title?.title} from this room?
                </Typography>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "20px",
                    }}
                >
                    <Button color="primary" onClick={onClose} style={{ marginRight: "10px" }}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={onConfirm}>
                        Delete
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;
