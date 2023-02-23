import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import React from "react";
import Bio from "./Bio";
import FeaturedPhotos from "./FeaturedPhotos";
import FeaturedFriends from "./FeaturedFriends";

const ProfileHome = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <Bio />
          </Grid>
          <Grid item>
            <FeaturedPhotos />
          </Grid>
          <Grid item>
            <FeaturedFriends />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Card>
          <CardHeader title="Post" />
          <CardContent>
            <Typography>Post Here</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfileHome;
