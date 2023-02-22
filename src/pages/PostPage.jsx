import { Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PostImgCarousel from "../components/PostImgCarousel";
import CommentSection from "../components/CommentSection";
import PostActions from "../components/PostActions";
import PostHeader from "../components/PostHeader";
import PostReactions from "../components/PostReactions";
import PostStats from "../components/PostStats";
import * as postSvc from "../services/post";
import { useParams } from "react-router-dom";

export default function PostPage() {
  const { postId, imgIndex } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    postSvc.getPost(+postId).then((res) => setPost(res.data));
  }, [postId]);

  const [showComments, setShowComments] = useState(false);

  function handleToggleComments() {
    setShowComments(!showComments);
  }

  return (
    <Grid container justifyContent="center">
      <Grid container width="45%" justifyContent="center" alignItems="center">
        <PostImgCarousel />
      </Grid>
      <Grid item width="40%">
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <PostHeader post={post} />
            <Typography paragraph>{post && post.value}</Typography>
            {/**
             TODO: for implementation once users are available and the reactions
            are decided
            */}
            <PostStats post={post} onToggleComments={handleToggleComments} />
            {/**
             * TODO: for implementation once the reactions are decided
             */}
            <PostReactions post={post} />
            <PostActions post={post} />
            <CommentSection show={showComments} post={post} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
