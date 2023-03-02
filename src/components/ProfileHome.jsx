import { Container, Grid, Stack, Typography } from "@mui/material";
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
import { compareByDateDesc } from "../services/util";
import { Box } from "@mui/system";

const ProfileHome = () => {
  const { username } = useParams();
  const [profileName, profileData] = useOutletContext();
  const { currentUser } = useContext(UserContext);
  const { allPosts } = useContext(PostContext);
  const [posts, setPosts] = useState([]);
  const isCurrentUser = currentUser && username === currentUser.username;
  useEffect(() => {
    if (username && currentUser) {
      if (username === currentUser.username) {
        const posts = allPosts.filter(
          (post) => post.userId === currentUser.userId
        );
        console.log("posts in profile", posts);
        setPosts(posts);
      } else {
        postSvc
          .getUserPosts(username)
          .then((res) => setPosts(res.data.sort(compareByDateDesc)));
        console.log("hindi eto");
      }
    }
  }, [allPosts, currentUser, username]);

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} md={4}>
        <Grid container spacing={2} direction="column">
          {currentUser && currentUser.bio && (
            <Grid item>
              <ProfileBio profileData={currentUser} />
            </Grid>
          )}
          <Grid item>
            <FeaturedPhotos posts={posts} profileName={profileName} />
          </Grid>
          <Grid item>
            <FeaturedFriends profileName={profileName} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12} md={8}>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          maxWidth={"md"}
          minWidth={"xs"}
          padding={"0 12px"}
        >
          {isCurrentUser && <AddPost />}
          <Box sx={{ textAlign: "start", width: "100%" }}>
            <Typography
              variant="h5"
              fontWeight="fontWeightBold"
              sx={{ padding: "20px", lineHeight: "0px" }}
            >
              Posts
            </Typography>
          </Box>
          <PostsList posts={posts} />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ProfileHome;
