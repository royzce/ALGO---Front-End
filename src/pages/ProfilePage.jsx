import Header from "../components/Header";
import { Container, Skeleton, Stack } from "@mui/material";
import ProfileNavBar from "../components/ProfileNavBar";
import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import * as userService from "../services/user";
import { ProfileNavContext } from "../context/ProfileNavContext";
import { useTheme } from "@mui/material/styles";

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
        console.log("profile page", res);
        setProfileData(res.data);
      });
    }

    handleLocChange();
  }, [user, username, currentUser, location]);

  const theme = useTheme();

  function handleLocChange() {
    if (currentUser) {
      const tab = location.pathname.split("/")[2];
      const isCurrentUser = currentUser.username === username;
      switch (tab) {
        case undefined:
          setProfileTab("Post");
          break;
        case "about":
          setProfileTab(isCurrentUser ? "About" : "Post");
          break;
        case "photos":
          setProfileTab(isCurrentUser ? "Photos" : "Post");
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
  }

  const styles = {
    profileHeader: {
      backgroundColor: theme.palette.mode === "dark" ? "#1E1E1E" : "#FFFFFF",
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
