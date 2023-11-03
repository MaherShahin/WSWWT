import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ContentItem = ({ item, onDelete }) => {
  return (
    <>
      <ListItem>
        <ListItemText primary={item.title} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDelete(item)}
          >
            <DeleteIcon sx={{
              ":hover": {
                color: 'red'
              }
            }} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};

export default ContentItem;
