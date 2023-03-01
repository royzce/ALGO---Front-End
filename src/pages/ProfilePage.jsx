import Header from "../components/Header";
import { Container, Skeleton, Stack } from "@mui/material";
import ProfileNavBar from "../components/ProfileNavBar";
import React, { useContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import * as userService from "../services/user";

const ProfilePage = ({ userProfile, friendProfile }) => {
  // const [profileName, setProfileName] = useState(null);
  const [profileData, setProfileData] = useState({});
  // const profileName = profileData && profileData.username;
  const { currentUser: user } = useContext(UserContext);
  const { username } = useParams();
  useEffect(() => {
    // if (user && userProfile === true) {
    //   setProfileName(user.username);
    // } else {
    //   setProfileName(friendProfile);
    // }
    console.log("username parameter", username);
    console.log("currentUser in ProfilePage", user);
    if (user && username) {
      if (username === user.username) {
        setProfileData(user);
      } else {
        userService.getProfileData(username).then((res) => {
          console.log("inside ProfilePage", res);
          setProfileData(res.data);
        });
      }
    }
    // if (profileName) {
    //   userService.getProfileData(profileName).then((res) => {
    //     setProfileData(res.data);
    //   });
    // }
  }, [user, username]);

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
          <ProfileNavBar profileName={username} />
        </Container>
      </Container>
      <Container sx={styles.profileContent}>
        <Outlet context={[username, profileData]} />
      </Container>
    </Container>
  );
};

export default ProfilePage;
