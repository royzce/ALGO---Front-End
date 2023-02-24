import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  TextField,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Stack } from "@mui/system";
import React, { useContext, useState } from "react";
import PostForm from "./PostForm";
import { PostContext } from "../context/PostContext";

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
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
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
            <TextField
              placeholder="Say something, Johnny."
              fullWidth
              onClick={() => setOpen(true)}
            />
            <IconButton onClick={handlePhotoClick}>
              <AddPhotoAlternateIcon />
            </IconButton>
          </Stack>
        </CardContent>
      </Card>
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
