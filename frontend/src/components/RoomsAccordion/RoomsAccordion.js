import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RoomBox from '../RoomBox/RoomBox';
import { Grid } from '@mui/material';

const RoomAccordion = ({ title, rooms }) => {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={2}>
                    {rooms.map((room, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <RoomBox room={room} />
                        </Grid>
                    ))}
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};

export default RoomAccordion;
