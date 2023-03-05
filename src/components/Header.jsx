import {
  Avatar,
  AvatarGroup,
  CardMedia,
  Container,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import cover from "../assets/cover.jpg";
import UserActionButtons from "./UserActionButtons";
import { FriendContext } from "../context/FriendContext";
import { UserContext } from "../context/UserContext";
import * as userService from "../services/user";

const Header = ({ profileName, profileData }) => {
  const { username } = useParams();
  const { allFriends } = useContext(FriendContext);
  const [friends, setFriends] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser && currentUser.username === username) {
      setFriends(allFriends);
    } else {
      userService.getSpecificFriends(username).then((friends) => {
        setFriends(friends.data);
      });
    }
  }, [profileName, currentUser, username, allFriends]);

  const styles = {
    profilePhoto: {
      border: "5px solid white",
      width: { xs: "125px", md: "200px" },
      height: { xs: "125px", md: "200px" },
      margin: "-50px 0 0 20px",
    },
    coverPhoto: {
      objectFit: "cover",
      width: "100%",
      height: { lg: "400px", md: "300px", sm: "200px", xs: "100px" },
      marginBottom: "10px",
      borderBottomLeftRadius: "12px",
      borderBottomRightRadius: "12px",
      boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.4)",
      backdropFilter: "blur(8px)",
    },
    stack1: {
      marginBottom: "20px",
    },
  };
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  return (
    <Container disableGutters>
      <CardMedia
        component="img"
        image={profileData && profileData.cover ? profileData.cover : cover}
        sx={styles.coverPhoto}
      />
      <Stack
        direction="row"
        justifyContent="flex-start"
        spacing={3}
        sx={styles.stack1}
        position="relative"
        display="flex"
        alignItems="center"
      >
        <Avatar
          src={profileData.avatar}
          alt="profile"
          sx={styles.profilePhoto}
        />
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          spacing={1}
        >
          {profileData && profileData.firstName && profileData.lastName ? (
            <Typography
              variant={isSmallScreen ? "h5" : "h4"}
              fontWeight="fontWeightBold"
            >
              {profileData.firstName + " " + profileData.lastName}
            </Typography>
          ) : (
            <Skeleton variant="rectangular" width={210} height={118} />
          )}
          <Typography>@{profileData.username}</Typography>
          <AvatarGroup max={4}>
            {friends &&
              friends.map((friend) => (
                <Avatar
                  src={friend.avatar}
                  alt={friend.username}
                  key={friend.userId}
                />
              ))}
          </AvatarGroup>
        </Stack>
        <div
          id="action"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            right: "20px",
            paddingRight: "",
          }}
        >
          <UserActionButtons
            username={username}
            userId={profileData && profileData.userId}
          />
        </div>
      </Stack>
    </Container>
  );
};

export default Header;
