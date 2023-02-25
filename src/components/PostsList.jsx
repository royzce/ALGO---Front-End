import { Stack } from "@mui/material";
import React from "react";
import React, { Fragment } from "react";
import Post from "./Post";

export default function PostsList({ posts }) {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
    >
      {posts.map((post) => (
        <Fragment key={post.postId}>
          <Post post={post} />
        </Fragment>
      ))}
    </Stack>
  );
}
