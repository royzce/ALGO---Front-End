import Header from "../components/Header";
import { Container } from "@mui/material";
import ProfileNavBar from "../components/ProfileNavBar";
import GlobalCSS from "../components/GlobalCSS";
import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { PostContext } from "../context/PostContext";

const ProfilePage = ({ userProfile, friendProfile }) => {
  const [profileId, setProfileId] = useState(null);
  const { currentUser: user } = useContext(UserContext);
  const { allPosts } = useContext(PostContext);

  useEffect(() => {
    if (userProfile === true) {
      setProfileId(user.userId);
    } else {
      setProfileId(friendProfile);
    }
  }, [profileId, user.userId, userProfile, friendProfile]);

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
          <Header profileId={profileId} />
          <ProfileNavBar />
        </Container>
      </Container>
      <Container sx={styles.profileContent}>
        <Outlet context={[profileId, allPosts]} />
      </Container>
    </Container>
  );
};

export default ProfilePage;
