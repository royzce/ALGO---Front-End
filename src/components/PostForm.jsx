import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
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
import { bgcolor, Stack } from "@mui/system";
import * as firebase from "../services/firebase";
import { UserContext } from "../context/UserContext";
import { PostContext } from "../context/PostContext";
import ColorTheme from "../components/ColorTheme";
import { useTheme } from "@mui/material/styles";

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
  const { onPosting, onEditing } = useContext(PostContext);
  const theme = useTheme();
  useEffect(() => {
    if (post) {
      setPreviewUrls(post.media.map((media) => media.mediaLink));
    }

    if (showTagSel) {
      userSvc.getFriends().then((res) => {
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

  function photosButtonBackground() {
    let bgcolor = null;
    if (addPhoto) {
      bgcolor =
        theme.palette.mode === "dark"
          ? "#2F2F2F"
          : ColorTheme.palette.body.main;
    } else {
      bgcolor = "transparent";
    }
    return bgcolor;
  }
  function tagButtonBackground() {
    let bgcolor = null;
    if (showTagSel) {
      bgcolor =
        theme.palette.mode === "dark"
          ? "#2F2F2F"
          : ColorTheme.palette.body.main;
    } else {
      bgcolor = "transparent";
    }
    return bgcolor;
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
    if (post) {
      onEditing(true);
    } else {
      onPosting(true);
    }
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
      maxWidth: "768px",
      margin: "auto",
      padding: "0 48px",
    },
    card: {
      width: "100%",
      maxHeight: "450px",
      borderRadius: "10px",
    },
    cardHeader: {
      textAlign: "center",
      borderBottom: "1px solid silver",
    },
    cardContent: {
      padding: "0px 30px 0px 20px",
      margin: "0px",
    },
    stackPostContent: {
      maxHeight: "245px",
      overflowY: "auto",
      marginRight: "-20px",
    },
    paddingRight: {
      paddingRight: "10px",
    },
    box: {
      width: "100%",
      marginBottom: "15px",
    },
    textField: {
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderRadius: "10px",
      },
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
            sx={styles.cardHeader}
          />
          <CardContent sx={styles.cardContent}>
            <PostFormHeader
              onSelect={handlePrivSel}
              privacy={form.privacy}
              onToggleTags={handleToggleTags}
              onTogglePhotos={handleTogglePhotos}
              onTogglePhotosButton={photosButtonBackground}
              onToggleTagButton={tagButtonBackground}
              totalTags={form.tags.length}
              user={user}
            />
            <Stack spacing={2} alignItems="center" sx={styles.stackPostContent}>
              {showTagSel && (
                <Autocomplete
                  sx={styles.paddingRight}
                  multiple
                  options={friends}
                  onChange={(event, value) => handleTagSel(value)}
                  getOptionLabel={(option) =>
                    `${option.firstName} ${option.lastName}`
                  }
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Tag your friends"
                      sx={styles.textField}
                    />
                  )}
                  size="small"
                  fullWidth
                />
              )}
              <TextField
                multiline
                value={form.value}
                rows={4}
                placeholder={user && `Say something, ${user.firstName}.`}
                onChange={handleTextChange}
                sx={[styles.textField, styles.paddingRight]}
                fullWidth
              />
              {addPhoto && (
                <Container disableGutters>
                  <Box sx={styles.box}>
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
                </Container>
              )}
            </Stack>
          </CardContent>
          <CardActions sx={{ padding: "15px" }}>
            <Button variant="contained" fullWidth onClick={handleSubmit}>
              {post ? "SAVE" : "POST"}
            </Button>
          </CardActions>
        </Card>
      </Slide>
    </Modal>
  );
}
