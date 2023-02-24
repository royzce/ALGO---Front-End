import { Stack } from "@mui/material";
import React from "react";
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
        <Post post={post} key={post.id} />
      ))}
    </Stack>
  );
}
