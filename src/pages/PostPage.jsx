import { Button, CircularProgress, Grid, IconButton } from "@mui/material";
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

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      spacing={2}
      marginY={2}
      width="100%"
    >
      {showPhotos && (
        <Grid item width="70%">
          {post ? (
            <Stack direction="row" alignItems="center" width="100%" spacing={2}>
              {post.media.length > 1 && (
                <IconButton onClick={handlePrev}>
                  <ChevronLeftIcon />
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
                  <ChevronRightIcon />
                </IconButton>
              )}
            </Stack>
          ) : (
            <CircularProgress />
          )}
        </Grid>
      )}
      <Grid item width="70%">
        <Post post={post} page={!!postId} />
      </Grid>
      <Grid item width="70%" textAlign="center">
        <Button variant="contained" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </Grid>
    </Grid>
  );
}
