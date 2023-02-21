import { Grid } from "@mui/material";
import React from "react";
import Post from "./Post";

export default function PostsList() {
  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item width="100%">
        <Post />
      </Grid>
      <Grid item width="100%">
        <Post />
      </Grid>
    </Grid>
  );
}
