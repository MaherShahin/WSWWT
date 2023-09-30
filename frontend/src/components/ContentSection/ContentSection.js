import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import './ContentSection.css'

const ContentSection = ({ contentItems }) => {
    return (
        <Grid container spacing={3} style={{ padding: '20px' }}>
            {contentItems.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                {item.title}
                            </Typography>
                            {/* Add more content details as needed */}
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ContentSection;
