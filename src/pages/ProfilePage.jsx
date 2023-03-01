import Header from "../components/Header";
import { Container } from "@mui/material";
import ProfileNavBar from "../components/ProfileNavBar";
import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProfilePage = ({ userProfile, friendProfile }) => {
  const [profileName, setProfileName] = useState(null);
  const { currentUser: user } = useContext(UserContext);
  useEffect(() => {
    if (user && userProfile === true) {
      setProfileName(user.username);
    } else {
      setProfileName(friendProfile);
    }
  }, [profileName, user, userProfile, friendProfile]);

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
      <Container sx={styles.profileHeader} maxWidth={false} disableGutters>
        <Container>
          <Header profileName={profileName} />
          <ProfileNavBar profileName={profileName} />
        </Container>
      </Container>
      <Container sx={styles.profileContent}>
        {/* <Outlet context={[profileId, allPosts]} /> */}
        <Outlet />
      </Container>
    </Container>
  );
};

export default ProfilePage;
