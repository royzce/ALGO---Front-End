import Header from "../components/Header";
import { Box, Container, Divider, Grid } from "@mui/material";
import ProfileNavBar from "../components/ProfileNavBar";
import GlobalCSS from "../components/GlobalCSS";
import React from "react";
import { Outlet } from "react-router-dom";
import { bgcolor } from "@mui/system";

const ProfilePage = () => {
  return (
    // <Grid
    //   container
    //   spacing={2}
    //   direction="column"
    //   alignItems="center"
    //   justifyContent="flex - start"
    // >
    //   <Grid item width="80%">
    //     <Box border="1px solid #ccc">
    //       <Header />
    //       <Divider />
    //       <ProfileNavBar />
    //     </Box>
    //   </Grid>
    //   <Grid item width="75%">
    //     <Outlet />
    //     {/* {content === null && <ProfileHome />}
    //     {content === "about" && <About />}
    //     {content === "friends" && <ManageFriends />} */}
    //   </Grid>
    // </Grid>
    <Container maxWidth={false} disableGutters>
      <GlobalCSS />
      <Container
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.15)",
        }}
        maxWidth={false}
        disableGutters
      >
        <Container>
          <Header />
          <ProfileNavBar />
        </Container>
      </Container>
      <Container sx={{ margin: "20px auto" }}>
        <Outlet />
      </Container>
    </Container>
  );
};

export default ProfilePage;
