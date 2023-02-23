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
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import PostFormHeader from "./PostFormHeader";
import * as userSvc from "../services/user";
import { Stack } from "@mui/system";
import * as firebase from "../services/firebase";

export default function PostForm({ post, withPhoto, onClose, open, onSubmit }) {
  const [form, setForm] = useState({
    value: post ? post.value : "",
    tags: post ? post.tags : [],
    privacy: post ? post.privacy : "friends",
    repost: post ? post.repost : false,
    edited: !!post,
  });
  const [showTagSel, setShowTagSel] = useState(false);
  const [addPhoto, setAddPhoto] = useState(withPhoto);
  const [friends, setFriends] = useState([]);
  const [previewUrls, setPreviewUrls] = useState(post ? post.imgUrl : []);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    console.log(`PostForm ${post && post.id} mounting...`);

    if (showTagSel) {
      userSvc.getFriends().then((res) => setFriends(res.data));
    }

    return () => console.log(`PostForm ${post && post.id} dismounting...`);
  }, [showTagSel, post]);

  function handlePrivSel(event) {
    const { value } = event.target;

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
    setAddPhoto(!addPhoto);
  }

  function handleTagSel(tagged) {
    const tags = tagged.map((friend) => friend.id);
    setForm({ ...form, tags });
  }

  function handleTextChange(event) {
    const { value } = event.target;
    setForm({ ...form, value });
  }

  async function handleFileSel(event) {
    const files = Array.from(event.target.files);
    setFiles(files);

    const urls = files.map((file) => {
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
  }

  async function handleSubmit() {
    let imgUrl = post ? [...post.imgUrl] : [];
    for (const file of files) {
      const url = await firebase.uploadImage(file);
      imgUrl.push(url);
    }

    const postInfo = { ...form, imgUrl };
    onSubmit(postInfo);
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: "50%", maxHeight: "90%", overflowY: "scroll" }}>
        <CardHeader
          title={post ? "EDIT POST" : "NEW POST"}
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
              placeholder="Say something, Johnny."
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
            Post
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
}
