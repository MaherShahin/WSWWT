import React, { useState, useRef, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useApi } from "../../api/useApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentRoomAction } from "../../redux/room/roomSlice";

export const SearchRoomModal = ({ isOpen, onClose, title }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCount, setDisplayCount] = useState(10);
  const listRef = useRef(null);

  const rooms = useSelector((state) => state.rooms?.joinedRooms);

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { request } = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setDisplayCount(10);
  }, [searchTerm]);

  const handleAddToRoom = async (roomId) => {
    const response = await request({
        method: "POST",
        url: `/room/addTitle/${roomId}`,
        data: {
          title: title,
        }
    });
    
    if (response.success) {
        toast.success("Title added to room");
        setTimeout(() => {
            onClose();
        }, 1000);
        
        navigate(`/room/${roomId}`);
        dispatch(setCurrentRoomAction(response.getData()));
    }

    onClose();
};

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setDisplayCount((prevCount) => prevCount + 10);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Add to Room</DialogTitle>
      <DialogContent>
        <div
          style={{
            padding: "10px 5px",
            borderRadius: 5,
          }}
        >
          <TextField
            fullWidth
            label="Search for Room"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Typography variant="body1" style={{ marginBottom: 10 }}>
            Rooms
            </Typography>
        <List
          onScroll={handleScroll}
          ref={listRef}
          style={{
            maxHeight: 300,
            overflow: "auto",
            border: "1px solid",
            borderRadius: 5,
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          {filteredRooms.slice(0, displayCount).map((room) => (
            <ListItem key={room.id}>
              <ListItemText
                primary={room.name}
                primaryTypographyProps={{
                  noWrap: true,
                  style: {
                    width: "80%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                }}
              />
              <ListItemSecondaryAction>
                <Button
                  onClick={() => handleAddToRoom(room._id)}
                  color="primary"
                >
                  Add
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <Button
        variant="contained"
        color="primary"
        onClick={onClose}
        style={{ margin: "15px 0" }}
      >
        Close
      </Button>
    </Dialog>
  );
};
