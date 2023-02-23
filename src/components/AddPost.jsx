import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Stack } from "@mui/system";
import React, { useContext, useState } from "react";
import PostForm from "./PostForm";
import { PostContext } from "../context/PostContext";

export default function AddPost() {
  const styles = {
    stack: {
      width: "100%",
    },
    paper: {
      width: "100%",
      padding: "24px",
      borderRadius: "10px",
    },
  };
  const { onAddPost } = useContext(PostContext);
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
          <Avatar
            alt="prof-pic"
            src="https://i.pinimg.com/originals/f9/a0/b4/f9a0b4f86ab0226ec83dfff20c08ba78.jpg"
          />
          <TextField placeholder="Say something, Johnny." fullWidth />
          <IconButton onClick={handlePhotoClick}>
            <AddPhotoAlternateIcon />
          </IconButton>
        </Stack>
      </Paper>
      {open && (
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
