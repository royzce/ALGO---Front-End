import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FriendContext } from "../context/FriendContext";
import { PopupContext } from "../context/PopupContext";
import * as userService from "../services/user";
import UserActionButtons from "./UserActionButtons";

const FriendsList = () => {
  // const [friends, setFriends] = useState([]);
  const { allFriends: friends } = useContext(FriendContext);

  // useEffect(() => {
  //   userService.getFriends().then((res) => {
  //     setFriends(res.data);
  //   });
  // }, []);

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
  return friends && friends.length > 0 ? (
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

                <UserActionButtons
                  username={friend.username}
                  userId={friend.userId}
                />
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  ) : (
    <Typography variant="body1">No friends to display.</Typography>
  );
};

export default FriendsList;
