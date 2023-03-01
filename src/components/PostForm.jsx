import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Modal,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useContext, useEffect, useState } from "react";
import PostFormHeader from "./PostFormHeader";
import * as userSvc from "../services/user";
import { Stack } from "@mui/system";
import * as firebase from "../services/firebase";
import { UserContext } from "../context/UserContext";
import { PostContext } from "../context/PostContext";

export default function PostForm({ post, withPhoto, onClose, open, onSubmit }) {
  const [form, setForm] = useState({
    value: post ? post.value : "",
    tags: post ? post.tags : [],
    privacy: post ? post.privacy : "friends",
    isRepost: false,
    repostId: 0,
  });
  const [showTagSel, setShowTagSel] = useState(false);
  const [addPhoto, setAddPhoto] = useState(withPhoto);
  const [friends, setFriends] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [files, setFiles] = useState([]);
  const { currentUser: user } = useContext(UserContext);
  const { onPosting } = useContext(PostContext);

  useEffect(() => {
    if (post) {
      setPreviewUrls(post.media.map((media) => media.mediaLink));
    }

    if (showTagSel) {
      userSvc.getFriends().then((res) => {
        console.log("res is", res);
        setFriends(res.data);
      });
    }
  }, [showTagSel, post]);

  function handlePrivSel(value) {
    if (value === "private") {
      setShowTagSel(false);
      setForm({ ...form, tags: [] });
    }

    setForm({ ...form, privacy: value });
  }

  function handleToggleTags() {
    if (showTagSel) {
      setForm({ ...form, tags: [] });
    }
    setShowTagSel(!showTagSel);
  }

  function handleTogglePhotos() {
    if (addPhoto) {
      handleClrFiles();
    }
    console.log("your fiends", friends);
    setAddPhoto(!addPhoto);
  }

  function handleTagSel(tagged) {
    const tags = tagged.map((friend) => friend.userId);
    setForm({ ...form, tags });
  }

  function handleTextChange(event) {
    const { value } = event.target;
    setForm({ ...form, value });
  }

  async function handleFileSel(event) {
    const selected = Array.from(event.target.files);
    if (selected.length < 1) {
      return;
    }

    setFiles([...files, ...selected]);

    const urls = selected.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    const res = await Promise.all(urls);
    setPreviewUrls([...previewUrls, ...res]);
  }

  function handleClrFiles() {
    setFiles([]);
    setPreviewUrls([]);

    if (post) {
      post.media = [];
    }
  }

  async function handleSubmit() {
    onClose();
    onPosting(true);
    let mediaLinks = post
      ? [...post.media.map((media) => media.mediaLink)]
      : [];
    for (const file of files) {
      const url = await firebase.uploadImage(file);
      mediaLinks.push(url);
    }

    const submitBody = { ...form, media: mediaLinks };
    onSubmit(submitBody);
  }

  const styles = {
    modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      width: "50%",
      maxHeight: "90%",
      overflowY: "scroll",
      borderRadius: "10px",
      padding: "10px",
    },
  };

  return (
    <Modal open={open} onClose={onClose} sx={styles.modal}>
      <Slide in={open} direction="down">
        <Card sx={styles.card}>
          <CardHeader
            title={
              <Typography variant="h5" fontWeight="fontWeightBold">
                {post ? "EDIT POST" : "NEW POST"}
              </Typography>
            }
            action={
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            }
            sx={{ textAlign: "center" }}
          />
          <CardContent>
            <PostFormHeader
              onSelect={handlePrivSel}
              privacy={form.privacy}
              onToggleTags={handleToggleTags}
              onTogglePhotos={handleTogglePhotos}
              totalTags={form.tags.length}
              user={user}
            />
            <Stack spacing={2} alignItems="center">
              {showTagSel && (
                <Grid item width="100%">
                  <Autocomplete
                    multiple
                    options={friends}
                    onChange={(event, value) => handleTagSel(value)}
                    getOptionLabel={(option) =>
                      `${option.firstName} ${option.lastName}`
                    }
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Tag your friends" />
                    )}
                    size="small"
                    fullWidth
                  />
                </Grid>
              )}
              <TextField
                multiline
                value={form.value}
                rows={4}
                placeholder={user && `Say something, ${user.firstName}.`}
                onChange={handleTextChange}
                fullWidth
              />
              {addPhoto && (
                <>
                  <Box sx={{ width: "100%" }}>
                    <Button variant="contained" component="label">
                      <input
                        hidden
                        multiple
                        accept="image/*"
                        type="file"
                        onChange={handleFileSel}
                      />
                      Add Photos
                    </Button>
                    {previewUrls.length > 0 && (
                      <Button onClick={handleClrFiles}>Clear</Button>
                    )}
                  </Box>
                  <ImageList cols={3}>
                    {previewUrls.map((url, index) => (
                      <ImageListItem className="image-preview" key={index}>
                        <img alt={`post-${index}`} src={url} />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </>
              )}
            </Stack>
          </CardContent>
          <CardActions>
            <Button variant="contained" fullWidth onClick={handleSubmit}>
              {post ? "SAVE" : "POST"}
            </Button>
          </CardActions>
        </Card>
      </Slide>
    </Modal>
  );
}
