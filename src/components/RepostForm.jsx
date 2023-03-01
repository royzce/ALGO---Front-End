import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Modal,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useContext, useEffect, useState } from "react";
import PostFormHeader from "./PostFormHeader";
import { Stack } from "@mui/system";
import Post from "./Post";
import { UserContext } from "../context/UserContext";
import { PostContext } from "../context/PostContext";
import * as userSvc from "../services/user";

export default function RepostForm({ open, onClose, srcPost, post, onSubmit }) {
  const [form, setForm] = useState({
    value: "",
    tags: [],
    privacy: "friends",
    isRepost: true,
    repostId: 0,
  });

  const [showTagSel, setShowTagSel] = useState(false);
  const [friends, setFriends] = useState([]);
  const { currentUser: user } = useContext(UserContext);
  const { onPosting } = useContext(PostContext);

  useEffect(() => {
    if (srcPost) {
      setForm({
        ...form,
        repostId: srcPost.postId,
      });
    }

    if (post) {
      const oldValue = {
        value: post.value,
        tags: post.tags,
        privacy: post.privacy,
        isRepost: true,
        repostId: post.repostId,
      };
      setForm(oldValue);
    }

    if (showTagSel) {
      userSvc.getFriends().then((res) => setFriends(res.data));
    }
  }, [showTagSel, srcPost, post]);

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

  function handleTagSel(tagged) {
    const tags = tagged.map((friend) => friend.id);
    setForm({ ...form, tags });
  }

  function handleTextChange(event) {
    const { value } = event.target;
    setForm({ ...form, value });
  }

  function handleSubmit() {
    onSubmit(form);
    onClose();
    onPosting(true);
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
                {post ? "EDIT POST" : "SHARE POST"}
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
              totalTags={form.tags.length}
              user={user}
              isRepost={true}
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
              <Post post={srcPost} shared={true} />
            </Stack>
          </CardContent>
          <CardActions>
            <Button variant="contained" fullWidth onClick={handleSubmit}>
              {post ? "SAVE" : "SUBMIT"}
            </Button>
          </CardActions>
        </Card>
      </Slide>
    </Modal>
  );
}
