import { Grid } from "@mui/material";
import React from "react";
import AddPost from "../components/AddPost";
import PostsList from "../components/PostsList";

export default function HomePage() {
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
        <PostsList />
      </Grid>
    </Grid>
  );
}
