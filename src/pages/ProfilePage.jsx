import Header from "../components/Header";
import { Box, Divider, Grid, Paper, styled } from "@mui/material";
import ProfileNavBar from "../components/ProfileNavBar";
import FeaturedPhotos from "../components/FeaturedPhotos";
import FeaturedFriends from "../components/FeaturedFriends";
import Bio from "../components/Bio";
import React, { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ProfilePage = () => {
  const [content, setContent] = useState(null);

  const handleContent = (page) => {
    this.setContent(page);
  };

  return (
    <Grid container>
      <Grid item xs></Grid>
      <Grid item xs={8}>
        <Box border="1px solid #ccc">
          <Header />
          <Divider />
          <ProfileNavBar setContent={handleContent} />
          {content === null ||
            (content === "profile" && (
              <Grid container>
                <Grid item xs={4}>
                  <Item>
                    <Bio />
                  </Item>
                  <Item>
                    <FeaturedPhotos />
                  </Item>
                  <Item>
                    <FeaturedFriends />
                  </Item>
                </Grid>
                <Grid item xs={8}>
                  <Item>Post Here</Item>
                </Grid>
              </Grid>
            ))}
        </Box>
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  );
};

export default ProfilePage;
