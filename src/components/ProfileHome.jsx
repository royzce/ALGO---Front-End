import { Container, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ProfileBio from "./ProfileBio";
import FeaturedPhotos from "./FeaturedPhotos";
import FeaturedFriends from "./FeaturedFriends";
import AddPost from "../components/AddPost";
import PostsList from "../components/PostsList";
import { PostContext } from "../context/PostContext";
import { useOutletContext, useParams } from "react-router";
import { UserContext } from "../context/UserContext";
import * as postSvc from "../services/post";

const ProfileHome = () => {
  const { username } = useParams();
  const [profileName, profileData] = useOutletContext();
  // const { currentUser } = useContext(UserContext);
  const { allPosts } = useContext(PostContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (username && username === profileData.username) {
      setPosts(allPosts.filter((post) => post.userId === profileData.userId));
    } else {
      postSvc.getUserPosts(username).then((res) => setPosts(res.data));
    }
  }, [allPosts, profileName, profileData, username]);

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
