import React from 'react';
import { Grid, TextField, Button } from '@mui/material';

const JoinRoomForm = ({ room, password, setPassword, handleJoin }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <h2>Do you want to join {room?.name}?</h2>
            </Grid>
            {room?.roomType === 'private' && (
                <Grid item xs={12}>
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
            )}
            <Grid item xs={6}>
                <Button
                    onClick={handleJoin}
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Join
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                >
                    Cancel
                </Button>
            </Grid>
        </Grid>
    );
};

export default JoinRoomForm;
