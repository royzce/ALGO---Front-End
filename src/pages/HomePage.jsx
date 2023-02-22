import { Grid, Stack } from "@mui/material";
import React, { useContext } from "react";
import AddPost from "../components/AddPost";
import GlobalCSS from "../components/GlobalCSS";
import PostsList from "../components/PostsList";
import { PostContext } from "../context/PostContext";

export default function HomePage() {
  const { allPosts } = useContext(PostContext);
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={1}
      maxWidth={"lg"}
      minWidth={"xs"}
      margin={"24px auto"}
      padding={"0 24px"}
    >
      <GlobalCSS />
      <AddPost />
      <PostsList posts={allPosts} />
    </Stack>
  );
}
