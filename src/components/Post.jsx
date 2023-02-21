import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import CommentSection from "./CommentSection";
import PostActions from "./PostActions";
import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import PostReactions from "./PostReactions";
import PostStats from "./PostStats";

export default function Post() {
  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <PostHeader></PostHeader>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <PostMedia />
        <PostStats />
        <PostReactions />
        <PostActions />
        <CommentSection />
      </CardContent>
    </Card>
  );
}
