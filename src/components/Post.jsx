import { Card, CardContent, Typography } from "@mui/material";
import React, { useState } from "react";
import * as commentSvc from "../services/comment";
import CommentSection from "./CommentSection";
import PostActions from "./PostActions";
import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import PostReactions from "./PostReactions";
import PostStats from "./PostStats";

export default function Post({ post }) {
  const [showComments, setShowComments] = useState(false);

  function handleToggleComments() {
    setShowComments(!showComments);
  }

  return (
    <Card sx={{ width: "100%", borderRadius: "10px" }}>
      <CardContent sx={{ width: "100%", padding: "24px" }}>
        <PostHeader post={post} />
        <Typography paragraph>{post.value}</Typography>
        <PostMedia post={post} />
        {/**
         TODO: for implementation once users are available and the reactions
        are decided
         */}
        <PostStats post={post} onToggleComments={handleToggleComments} />
        {/**
         * TODO: for implementation once the reactions are decided
         */}
        {/* <PostReactions post={post} /> */}
        <hr style={{ marginBottom: "12px" }} />
        <PostActions post={post} />
        <hr style={{ marginTop: "12px" }} />
        <CommentSection show={showComments} post={post} />
      </CardContent>
    </Card>
  );
}
