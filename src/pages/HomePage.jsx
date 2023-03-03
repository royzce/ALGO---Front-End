import { Stack } from "@mui/material";
import React, { useContext, useEffect } from "react";
import AddPost from "../components/AddPost";
import PostsList from "../components/PostsList";
import { PostContext } from "../context/PostContext";

export default function HomePage() {
  const { allPosts, getAllPosts } = useContext(PostContext);

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
      maxWidth={"md"}
      minWidth={"xs"}
      margin={"12px auto"}
      padding={"0 12px"}
    >
      <AddPost />
      <PostsList posts={allPosts} />
    </Stack>
  );
}
