import React from 'react';
import { List } from '@mui/material';
import ContentItem from '../ContentItem/ContentItem';
import { Divider } from '@mui/material';

const ContentList = ({ contentItems, onDelete }) => {
    return (
        <List sx={{
            width: '100%',
            bgcolor: 'background.paper',
        
        }}>
            {contentItems.map(item => (
                <ContentItem 
                    key={item._id} 
                    item={item}
                    onDelete={onDelete}
                />
            ))}
        </List>
    );
};

export default ContentList;
