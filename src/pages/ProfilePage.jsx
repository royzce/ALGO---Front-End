import Header from "../components/Header";
import { Box, Divider, Grid } from "@mui/material";
import ProfileNavBar from "../components/ProfileNavBar";
import React from "react";
import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="flex - start"
    >
      <Grid item width="80%">
        <Box border="1px solid #ccc">
          <Header />
          <Divider />
          <ProfileNavBar />
        </Box>
      </Grid>
      <Grid item width="75%">
        <Outlet />
        {/* {content === null && <ProfileHome />}
        {content === "about" && <About />}
        {content === "friends" && <ManageFriends />} */}
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
