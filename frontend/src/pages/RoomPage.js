import React, { useState, useEffect } from "react";
import { Button, Box, Container, Typography } from "@mui/material";
import RoomUsers from "../components/RoomUsers/RoomUsers";
import { useApi } from "../api/useApi";
import ContentSection from "../components/ContentSection/ContentSection";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentRoomAction } from "../redux/room/roomSlice";
import RoomInvitationModal from "../components/RoomInvitationModal/RoomInvitationModal";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ContentList from "../components/ContentList/ContentList";
import DeleteModal from "../components/DeleteModal/DeleteModal";
import { toast } from "react-toastify";

const Room = () => {
  const params = useParams();

  const ROOM_API_ENDPOINT = "/room/" + params.id;

  const { currentRoom } = useSelector((state) => state.rooms);
  const [viewType, setViewType] = useState("cards");

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setViewType(newView);
    }
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null);

  const handleOpenModal = (title) => {
      setSelectedTitle(title);
      setOpenDeleteModal(true);
  };

  const handleCloseModal = () => {
      setOpenDeleteModal(false);
  };


  const handleDeleteConfirmed = async () => {
    if (!selectedTitle) return;

    const response = await request({
        method: "DELETE",
        url: `/room/removeTitle/${currentRoom._id}`,
        data: {
          title: selectedTitle,
        }
    });

    const room = response.getData();

    if (response.getData()) {
        console.log("Title deleted");
        dispatch(setCurrentRoomAction(room));
        toast.success("Title deleted");
        // Close the delete modal
        handleCloseModal();
    } else {
        // Handle any errors that may occur
        console.error("Failed to delete title");
        toast.error("Failed to delete title");
        handleCloseModal();
    }
};



  const [users, setUsers] = useState([]);
  const { request } = useApi();
  const [contentItems, setContentItems] = useState([]);
  const [roomName, setRoomName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRoom = async () => {
      console.log(params.id);
      const response = await request({
        method: "GET",
        url: ROOM_API_ENDPOINT,
      });

      let room = response.data;
      dispatch(setCurrentRoomAction(room));
    };
    fetchRoom();
  }, [params.id]);

  useEffect(() => {
    if (!currentRoom) {
      return;
    }

    console.log(currentRoom);
    setUsers(currentRoom.users);

    var currentItems = currentRoom.currentTitles;
    if (!currentRoom.currentTitles) {
      const contentItem1 = {
        _id: "1",
        title: "Content Item 1",
        description: "This is the first content item",
      };

      const contentItem2 = {
        _id: "2",
        title: "Content Item 2",
        description: "This is the second content item",
      };

      currentItems = [contentItem1, contentItem2];
    }

    setContentItems(currentItems);
    setRoomName(currentRoom.name);
  }, [currentRoom]);

  return (
    <Container>
      <Typography variant="h4" align="justify-left" paddingTop={3} gutterBottom>
        {roomName}
      </Typography>
      <RoomUsers users={users} />
      <Box marginBottom={2}>
        <ToggleButtonGroup
          value={viewType}
          exclusive
          onChange={handleViewChange}
        >
          <ToggleButton value="cards">Cards View</ToggleButton>
          <ToggleButton value="list">List View</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {viewType === 'cards' ? (
            <ContentSection 
                contentItems={contentItems}
                onDelete={handleOpenModal}
            />
        ) : (
            <ContentList 
                contentItems={contentItems} 
                onDelete={handleOpenModal}
            />
        )}

        <DeleteModal 
            open={openDeleteModal}
            title={selectedTitle}
            onClose={handleCloseModal}
            onConfirm={handleDeleteConfirmed}
        />


      <Box display="flex" justifyContent="space-around" padding={3}>
        <Button variant="contained" color="primary">
          Add Content
        </Button>
        <RoomInvitationModal roomId={params.id} />
      </Box>
    </Container>
  );
};

export default Room;
