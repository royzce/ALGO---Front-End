import { Container, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ProfileBio from "./ProfileBio";
import FeaturedPhotos from "./FeaturedPhotos";
import FeaturedFriends from "./FeaturedFriends";
import AddPost from "../components/AddPost";
import PostsList from "../components/PostsList";
import { PostContext } from "../context/PostContext";
import { useOutletContext } from "react-router";

const ProfileHome = () => {
  const [profileName, profileData] = useOutletContext();
  const { allPosts } = useContext(PostContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(allPosts.filter((post) => post.userId === profileData.userId));
  }, [allPosts, profileName, profileData]);

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={4}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <ProfileBio profileData={profileData} />
          </Grid>
          <Grid item>
            <FeaturedPhotos posts={posts} profileName={profileName} />
          </Grid>
          <Grid item>
            <FeaturedFriends profileName={profileName} />
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
