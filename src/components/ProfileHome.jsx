import { Container, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ProfileBio from "./ProfileBio";
import FeaturedPhotos from "./FeaturedPhotos";
import FeaturedFriends from "./FeaturedFriends";
import AddPost from "../components/AddPost";
import PostsList from "../components/PostsList";
import { PostContext } from "../context/PostContext";
import { UserContext } from "../context/UserContext";

const ProfileHome = () => {
  const { allPosts } = useContext(PostContext);
  const { currentUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setPosts(allPosts.filter((post) => post.userId === currentUser.userId));
  }, [allPosts]);
  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={4}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <ProfileBio />
          </Grid>
          <Grid item>
            <FeaturedPhotos posts={posts} />
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
          <PostsList posts={posts} />
        </Container>
      </Grid>
    </Grid>
  );
};

export default ProfileHome;
