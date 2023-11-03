import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import { SearchRoomModal } from "../SearchRoomModal/SearchRoomModal";

export const TitleModal = ({ isOpen, title, onClose }) => {
  const [addRoomOpen, setAddRoomOpen] = useState(false);

  const handleAddRoomClick = () => {
    setAddRoomOpen(true);
  };

  const handleAddRoomClose = () => {
    setAddRoomOpen(false);
    onClose();
  };

  if (!title) {
    return null;
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogContent>
        <div style={{ display: "flex", alignItems: "start", gap: "20px" }}>
          {title.poster_path ? (
            <CardMedia
              component="img"
              sx={{ width: 200, height: 300 }}
              image={`https://image.tmdb.org/t/p/w500/${title.poster_path}`}
              alt={`${title.title} poster`}
            />
          ) : (
            <div
              style={{
                width: 200,
                height: 300,
                backgroundColor: "#ddd",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">No poster available</Typography>
            </div>
          )}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {title.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {title.overview}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Rating: {title.vote_average} / 10
              </Typography>
            </CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddRoomClick}
              >
                Add to Room
              </Button>
            </div>
          </div>
        </div>
        <SearchRoomModal isOpen={addRoomOpen} onClose={handleAddRoomClose} title={title} />
      </DialogContent>
    </Dialog>
  );
};
