import React from 'react';
import { Grid } from '@mui/material';
import './ContentSection.css'
import TitleCard from '../TitleCard/TitleCard';

const ContentSection = ({ contentItems, onDelete }) => {

    return (
        <Grid container spacing={3} style={{ padding: '20px' }}>
            {contentItems.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <TitleCard title={item} onOpenDeleteModal={onDelete} isOwner={true} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ContentSection;
