import Header from "../components/Header";
import { Container, Skeleton, Stack } from "@mui/material";
import ProfileNavBar from "../components/ProfileNavBar";
import React, { useContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import * as userService from "../services/user";

const ProfilePage = ({ userProfile, friendProfile }) => {
  const { username } = useParams();
  const { currentUser } = useContext(UserContext);
  const isCurrentUser = currentUser && username === currentUser.username;
  const [profileData, setProfileData] = useState({});
  const { currentUser: user } = useContext(UserContext);

  useEffect(() => {
    if (isCurrentUser) {
      setProfileData(user);
    } else {
      userService.getProfileData(username).then((res) => {
        setProfileData(res.data);
      });
    }
  }, [user, username, currentUser]);

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
          <Header profileData={profileData} />
          <ProfileNavBar profileName={username} isCurrentUser={isCurrentUser} />
        </Container>
      </Container>
      <Container sx={styles.profileContent}>
        <Outlet context={[username, profileData]} />
      </Container>
    </Container>
  );
};

export default ProfilePage;
