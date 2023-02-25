import { CircularProgress, Grid, IconButton } from "@mui/material";
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
  const navigate = useNavigate();

  useEffect(() => {
    postSvc.getPost(+postId).then((res) => setPost(res.data));
  }, [postId]);

  function handleNext() {
    const max = post.imgUrl.length - 1;
    let newIndex;
    if (+imgIndex === max) {
      newIndex = 0;
    } else {
      newIndex = +imgIndex + 1;
    }
    // console.log(`posts/${postId}/${newIndex}`);
    navigate(`/posts/${postId}/${newIndex}`);
  }

  function handlePrev() {
    const max = post.imgUrl.length - 1;
    let newIndex;
    if (+imgIndex === 0) {
      newIndex = max;
    } else {
      newIndex = +imgIndex - 1;
    }
    // console.log(`posts/${postId}/${newIndex}`);
    navigate(`/posts/${postId}/${newIndex}`);
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item width="55%">
        {post ? (
          <Stack direction="row" alignItems="center" width="100%">
            {post.imgUrl.length > 1 && (
              <IconButton onClick={handlePrev}>
                <ChevronLeftIcon />
              </IconButton>
            )}

            <div>
              <img
                alt={`post-${post.id}-${imgIndex}`}
                src={post.imgUrl[+imgIndex]}
                className="img-post-page"
              />
            </div>
            {post.imgUrl.length > 1 && (
              <IconButton onClick={handleNext}>
                <ChevronRightIcon />
              </IconButton>
            )}
          </Stack>
        ) : (
          <CircularProgress />
        )}
      </Grid>
      <Grid item width="40%">
        <Post post={post} page={!!postId} />
      </Grid>
    </Grid>
  );
}
