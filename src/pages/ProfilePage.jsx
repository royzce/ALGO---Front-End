import Header from "../components/Header";
import { Container } from "@mui/material";
import ProfileNavBar from "../components/ProfileNavBar";
import GlobalCSS from "../components/GlobalCSS";
import React from "react";
import { Outlet } from "react-router-dom";

const ProfilePage = () => {
  const styles = {
    profileHeader: {
      backgroundColor: "white",
      boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.15)",
    },
    profileContent: {
      margin: "20px auto",
    },
  };

  return (
    <Container maxWidth={false} disableGutters>
      <GlobalCSS />
      <Container sx={styles.profileHeader} maxWidth={false} disableGutters>
        <Container>
          <Header />
          <ProfileNavBar />
        </Container>
      </Container>
      <Container sx={styles.profileContent}>
        <Outlet />
      </Container>
    </Container>
  );
};

export default ProfilePage;
