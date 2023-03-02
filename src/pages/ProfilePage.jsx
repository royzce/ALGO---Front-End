import Header from "../components/Header";
import { Container, Skeleton, Stack } from "@mui/material";
import ProfileNavBar from "../components/ProfileNavBar";
import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import * as userService from "../services/user";
import { ProfileNavContext } from "../context/ProfileNavContext";

const ProfilePage = ({ userProfile, friendProfile }) => {
  const { username } = useParams();
  const { currentUser } = useContext(UserContext);
  const isCurrentUser = currentUser && username === currentUser.username;
  const [profileData, setProfileData] = useState({});
  const { currentUser: user } = useContext(UserContext);

  const [profileTab, setProfileTab] = useState("Post");

  const location = useLocation();
  useEffect(() => {
    if (isCurrentUser) {
      setProfileData(user);
    } else {
      userService.getProfileData(username).then((res) => {
        setProfileData(res.data);
      });
    }

    handleLocChange();
  }, [user, username, currentUser, location]);

  function handleLocChange() {
    const tab = location.pathname.split("/")[2];
    switch (tab) {
      case "":
        setProfileTab("Post");
        break;
      case "about":
        setProfileTab("About");
        break;
      case "photos":
        setProfileTab("Photos");
        break;
      case "friends":
      case "friend-request":
      case "discover-friend":
        setProfileTab("Friends");
        break;
      default:
        break;
    }
  }

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
    <ProfileNavContext.Provider
      value={{
        profileTab,
        setProfileTab,
      }}
    >
      <Container maxWidth={false} disableGutters>
        <Container sx={styles.profileHeader} maxWidth={false} disableGutters>
          <Container>
            <Header profileData={profileData} />
            <ProfileNavBar
              profileName={username}
              isCurrentUser={isCurrentUser}
            />
          </Container>
        </Container>
        <Container sx={styles.profileContent}>
          <Outlet context={[username, profileData]} />
        </Container>
      </Container>
    </ProfileNavContext.Provider>
  );
};

export default ProfilePage;
