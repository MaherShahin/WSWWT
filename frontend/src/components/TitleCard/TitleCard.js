import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Modal,
  Button,
  CardMedia,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./TitleCard.css";

const TitleCard = ({ title, onOpenDeleteModal, isOwner }) => {
  const [open, setOpen] = useState(false);

  const title_path = title.poster_path;
  const name = title.title || title.original_title || title.name || title.original_name;

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleDeleteConfirmed = () => {
    console.log("delete confirmed");
    handleCloseModal();
  };

  return (
    <>
      <Card>
        <CardContent className="CardContent">
          {title.poster_path ? (
            <CardMedia
              component="img"
              image={`https://image.tmdb.org/t/p/w500/${title_path}`}
              alt={`${title.title} poster`}
            />
          ) : (
            <div
              style={{
                backgroundColor: "#ddd",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">No poster available</Typography>
            </div>
          )}
          <div className="overlay" is>
            <Typography variant="h5" gutterBottom className="title">
              {name}
            </Typography>
            { isOwner && (
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={handleOpenModal}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TitleCard;
