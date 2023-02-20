import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import PostImgCarousel from "../components/PostImgCarousel";
import CommentSection from "../components/CommentSection";
import PostActions from "../components/PostActions";
import PostHeader from "../components/PostHeader";
import PostReactions from "../components/PostReactions";
import PostStats from "../components/PostStats";

export default function PostPage() {
  return (
    <Grid container justifyContent="center">
      <Grid container width="45%" justifyContent="center" alignItems="center">
        <PostImgCarousel />
      </Grid>
      <Grid item width="40%">
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <PostHeader />
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            <PostStats />
            <PostReactions />
            <PostActions />
            <CommentSection />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
