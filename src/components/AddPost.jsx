import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  LinearProgress,
  TextField,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Link as RouterLink } from "react-router-dom";
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
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            style={styles.stack}
          >
            <RouterLink to={user && `/${user.username}`}>
              <Avatar alt="avatar" src={user && user.avatar} />
            </RouterLink>
            <TextField
              placeholder={user && `Say something, ${user.firstName}.`}
              fullWidth
              onClick={() => setOpen(true)}
            />
            <IconButton onClick={handlePhotoClick}>
              <AddPhotoAlternateIcon />
            </IconButton>
          </Stack>
        </CardContent>
      </Card>

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
