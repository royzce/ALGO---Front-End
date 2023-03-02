import {
  Avatar,
  CircularProgress,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React, { useEffect, useState } from "react";
import * as postSvc from "../services/post";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../components/Post";
import { Stack } from "@mui/system";

export default function PostPage() {
  const { postId, imgIndex } = useParams();
  const [post, setPost] = useState(null);

  const showPhotos = !!imgIndex;
  console.log(showPhotos);
  const navigate = useNavigate();

  useEffect(() => {
    postSvc.getPost(+postId).then((res) => {
      const p = res.data;
      if (p && p.media && p.media.length > 0 && !imgIndex) {
        navigate(`/posts/${postId}/0`);
      }
      setPost(p);
    });
  }, [postId, imgIndex]);

  function handleNext() {
    const max = post.media.length - 1;
    let newIndex;
    if (+imgIndex === max) {
      newIndex = 0;
    } else {
      newIndex = +imgIndex + 1;
    }
    navigate(`/posts/${postId}/${newIndex}`);
  }

  function handlePrev() {
    const max = post.media.length - 1;
    let newIndex;
    if (+imgIndex === 0) {
      newIndex = max;
    } else {
      newIndex = +imgIndex - 1;
    }
    navigate(`/posts/${postId}/${newIndex}`);
  }

  const styles = {
    gridContainer: {
      width: "100%",
      maxWidth: "xl",
      margin: "20px auto",
      paddingX: "12px",
    },
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
      spacing={2}
      sx={styles.gridContainer}
    >
      {showPhotos && (
        <Grid item xs={12} lg={7.5}>
          {post ? (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              spacing={2}
            >
              {post.media.length > 1 && (
                <IconButton onClick={handlePrev}>
                  <Avatar>
                    <ChevronLeftIcon />
                  </Avatar>
                </IconButton>
              )}

              <div>
                <img
                  alt={`post-${post.id}-${imgIndex}`}
                  src={post.media[+imgIndex].mediaLink}
                  className="img-post-page"
                />
              </div>
              {post.media.length > 1 && (
                <IconButton onClick={handleNext}>
                  <Avatar>
                    <ChevronRightIcon />
                  </Avatar>
                </IconButton>
              )}
            </Stack>
          ) : (
            <CircularProgress />
          )}
        </Grid>
      )}
      <Grid item xs={12} lg={4.5}>
        <Post post={post} page={!!postId} />
      </Grid>
    </Grid>
  );
}
