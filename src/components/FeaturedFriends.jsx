import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardMedia,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import * as userService from "../services/user";
import { Link } from "react-router-dom";
import defaultAvatar from "../assets/avatar.jpg";
import { FriendContext } from "../context/FriendContext";
import { UserContext } from "../context/UserContext";

const FeaturedFriends = ({ profileName }) => {
  const { allFriends } = useContext(FriendContext);

  const { currentUser } = useContext(UserContext);
  const showButton =
    allFriends &&
    allFriends.length > 0 &&
    currentUser &&
    currentUser.username === profileName;

  const styles = {
    borderRadius: {
      borderRadius: "10px",
    },
  };

  return (
    allFriends && (
      <Card sx={styles.borderRadius}>
        <CardHeader
          title={
            <Typography variant="h5" fontWeight="fontWeightBold">
              Friends
            </Typography>
          }
          subheader={allFriends.length + " Friends"}
          action={
            showButton && (
              <Button
                underline="hover"
                LinkComponent={Link}
                to={`/${profileName}/friends`}
              >
                See all friends
              </Button>
            )
          }
        />
        <CardMedia sx={{ padding: "0 15px" }}>
          <ImageList cols={3} sx={styles.borderRadius}>
            {allFriends.length > 0 ? (
              allFriends.map((friend, index) => (
                <ImageListItem
                  key={index}
                  component={Link}
                  to={`/${friend.username}`}
                >
                  <img
                    src={friend.avatar ? friend.avatar : defaultAvatar}
                    alt={friend.username}
                  />
                  <ImageListItemBar
                    title={friend.firstName + " " + friend.lastName}
                    position="bottom"
                  />
                </ImageListItem>
              ))
            ) : (
              <Typography variant="subtitle2">No Friends To Show</Typography>
            )}
          </ImageList>
        </CardMedia>
      </Card>
    )
  );
};

export default FeaturedFriends;
