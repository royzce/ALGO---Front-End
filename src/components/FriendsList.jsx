import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { PopupContext } from "../context/PopupContext";
import * as userService from "../services/user";
import UserActionButtons from "./UserActionButtons";

const FriendsList = () => {
  const { onShowSuccess, onShowFail } = useContext(PopupContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    userService.getFriends().then((res) => {
      setFriends(res.data);
    });
  }, []);

  const onRemoveFriend = async (friendId) => {
    await userService
      .removeFriend(friendId)
      .then((res) => {
        onShowSuccess("Removed Friend");
        setFriends(friends.filter((friend) => friend.userId !== friendId));
      })
      .catch((err) => {
        onShowFail("An unexpected error occured. Try again later.");
        console.log("Error", err);
      });
  };

  const styles = {
    card: {
      height: 150,
      border: "1px solid lightgray",
      borderRadius: "10px",
      boxShadow: "none",
    },
    cardContent: {
      display: "flex",
      alignItems: "center",
      marginTop: 2,
      justifyContent: "space-between",
    },
  };
  return (
    <Grid container spacing={2}>
      {friends.map((friend, index) => {
        return (
          <Grid item key={index} xs={6}>
            <Card sx={styles.card}>
              <CardContent sx={styles.cardContent}>
                <Avatar
                  src={friend.avatar}
                  alt={friend.username}
                  variant="rounded"
                  sx={{ width: 80, height: 86 }}
                />
                <Typography variant="h6">
                  {friend.firstName + " " + friend.lastName}
                </Typography>
                {/* <Button
                  color="error"
                  variant="contained"
                  size="small"
                  onClick={() => onRemoveFriend(friend.userId)}
                >
                  Unfriend
                </Button> */}
                <UserActionButtons
                  username={friend.username}
                  userId={friend.userId}
                  handleActionFriendList={onRemoveFriend}
                />
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default FriendsList;
