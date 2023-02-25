import {
  Avatar,
  Box,
  IconButton,
  LinearProgress,
  Paper,
  TextField,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Stack } from "@mui/system";
import React, { useContext, useState } from "react";
import PostForm from "./PostForm";
import { PostContext } from "../context/PostContext";
import { UserContext } from "../context/UserContext";

export default function AddPost() {
  const styles = {
    card: {
      width: "100%",
      borderRadius: "10px",
    },
    cardContent: {
      width: "100%",
      padding: "24px",
    },
  };
  const { onAddPost, posting } = useContext(PostContext);
  const { currentUser: user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [withPhoto, setWithPhoto] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  function handleTogglePhotos() {
    setWithPhoto(!withPhoto);
  }

  function handlePhotoClick() {
    setWithPhoto(true);
    setOpen(true);
  }

  function handleSubmit(newPost) {
    onAddPost(newPost);
  }

  return (
    <>
      <Paper elevation={2} style={styles.paper}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          style={styles.stack}
        >
          <Avatar alt="avatar" src={user && user.avatar} />
          <TextField
            placeholder={user && `Say something, ${user.firstName}.`}
            fullWidth
            onClick={() => setOpen(true)}
          />
          <IconButton onClick={handlePhotoClick}>
            <AddPhotoAlternateIcon />
          </IconButton>
        </Stack>
      </Paper>
      {posting && (
        <Box sx={{ width: "95%" }}>
          <LinearProgress />
        </Box>
      )}
      {(open || posting) && (
        <PostForm
          withPhoto={withPhoto}
          onTogglePhotos={handleTogglePhotos}
          onClose={handleClose}
          open={open}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}
