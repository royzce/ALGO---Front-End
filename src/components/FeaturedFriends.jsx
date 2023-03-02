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
import React, { useEffect, useState } from "react";
import * as userService from "../services/user";
import { Link } from "react-router-dom";
import defaultAvatar from "../assets/avatar.jpg";

const FeaturedFriends = ({ profileName }) => {
  const [friends, setFriends] = useState([]);
  const [isDisabled, setDisabled] = useState(false);
  useEffect(() => {
    userService.getFriends().then((res) => {
      setFriends(res.data);
    });
  }, []);

  useEffect(() => {
    if (friends.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [friends]);

  const styles = {
    borderRadius: {
      borderRadius: "10px",
    },
  };

  return (
    friends && (
      <Card sx={styles.borderRadius}>
        <CardHeader
          title={
            <Typography variant="h5" fontWeight="fontWeightBold">
              Friends
            </Typography>
          }
          subheader={friends.length + " Friends"}
          action={
            <Button
              underline="hover"
              LinkComponent={Link}
              to={`/${profileName}/friends`}
              disabled={isDisabled}
            >
              See all friends
            </Button>
          }
        />
        <CardMedia sx={{ padding: "0 15px" }}>
          <ImageList cols={3} sx={styles.borderRadius}>
            {friends.length > 0 ? (
              friends.map((friend, index) => (
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
