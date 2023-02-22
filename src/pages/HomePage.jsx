import { Grid } from "@mui/material";
import React, { useContext } from "react";
import AddPost from "../components/AddPost";
import PostsList from "../components/PostsList";
import { PostContext } from "../context/PostContext";

export default function HomePage() {
  const { allPosts } = useContext(PostContext);
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      spacing={2}
    >
      <Grid item width="50%">
        <AddPost />
      </Grid>
      <Grid item width="50%">
        <PostsList posts={allPosts} />
      </Grid>
    </Grid>
  );
}
