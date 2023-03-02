import { Grid, Stack } from "@mui/material";
import React, { Fragment } from "react";
import Post from "./Post";

export default function PostsList({ posts }) {
  console.log("inside PostsList", posts);
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      {posts.map((post) => (
        <Fragment key={post.postId}>
          <Post post={post} />
        </Fragment>
      ))}
    </Grid>
  );
}
