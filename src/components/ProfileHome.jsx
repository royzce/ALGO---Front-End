import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import ProfileBio from "./ProfileBio";
import FeaturedPhotos from "./FeaturedPhotos";
import FeaturedFriends from "./FeaturedFriends";
import AddPost from "../components/AddPost";
import PostsList from "../components/PostsList";
import { PostContext } from "../context/PostContext";

const ProfileHome = () => {
  const { allPosts } = useContext(PostContext);
  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={4}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <ProfileBio />
          </Grid>
          <Grid item>
            <FeaturedPhotos />
          </Grid>
          <Grid item>
            <FeaturedFriends />
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12} md={8}>
        <Container disableGutters>
          <AddPost />
          <Typography
            variant="h5"
            fontWeight="fontWeightBold"
            sx={{ padding: "20px" }}
          >
            Posts
          </Typography>
          <PostsList posts={allPosts} />
        </Container>
      </Grid>
    </Grid>
  );
};

export default ProfileHome;
