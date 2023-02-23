import { Stack } from "@mui/material";
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
      maxWidth={"md"}
      minWidth={"xs"}
      margin={"12px auto"}
      padding={"0 12px"}
    >
      <GlobalCSS />
      <AddPost />
      <PostsList posts={allPosts} />
    </Stack>
  );
}
