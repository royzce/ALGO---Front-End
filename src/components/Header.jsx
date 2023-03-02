import {
  Avatar,
  AvatarGroup,
  CardMedia,
  Container,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as userService from "../services/user";
import UserActionButtons from "./UserActionButtons";

const Header = ({ profileName, profileData }) => {
  const { username } = useParams();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // console.log("pprrooddaattaa is ", profileData);
    console.log("username iz ", username);
    userService.getFriends().then((res) => {
      setFriends(res.data);
    });
  }, []);

  const styles = {
    profilePhoto: {
      border: "5px solid white",
      width: 200,
      height: 200,
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
  return (
    <Container disableGutters>
      <CardMedia
        component="img"
        image="https://wallpaperaccess.com/full/22249.jpg"
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
            <Typography variant="h4" fontWeight="fontWeightBold">
              {profileData.firstName + " " + profileData.lastName}
            </Typography>
          ) : (
            <Skeleton variant="rectangular" width={210} height={118} />
          )}
          <Typography>@{profileData.username}</Typography>
          <AvatarGroup max={4}>
            {friends.map((friend) => (
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
          <UserActionButtons username={username} />
        </div>
      </Stack>
    </Container>
  );
};

export default Header;
