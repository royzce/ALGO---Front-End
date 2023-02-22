import { Grid } from "@mui/material";
import React from "react";
import Post from "./Post";

export default function PostsList({ posts }) {
  return (
    <Grid container justifyContent="center" spacing={2}>
      {posts.map((post) => (
        <Grid item width="100%" key={post.id}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
}
