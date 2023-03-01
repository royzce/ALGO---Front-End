import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as userService from "../services/user";

const FriendRequestList = () => {
  const [friendRequest, setFriendRequest] = useState([]);

  useEffect(() => {
    userService.getFriendRequest().then((res) => {
      console.log("Friend request", res);
      setFriendRequest(res.data);
    });
  }, []);

  const onAcceptRequest = async (friendId) => {
    await userService
      .acceptRequest(friendId)
      .then((res) => {
        alert(res.data);
        setFriendRequest(
          friendRequest.filter((req) => req.userId !== friendId)
        );
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const onDeleteRequest = async (friendId) => {
    await userService
      .rejectRequest(friendId)
      .then((res) => {
        alert("Deleted friend request");
        setFriendRequest(
          friendRequest.filter((req) => req.userId !== friendId)
        );
      })
      .catch((err) => {
        console.log("Error");
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
      {friendRequest.map((friend, index) => {
        return (
          <Grid item key={index} xs={6}>
            <Card sx={styles.card}>
              <CardContent sx={styles.cardContent}>
                <Avatar
                  src={friend.user.avatar}
                  alt={friend.user.username}
                  variant="rounded"
                  sx={{ width: 80, height: 86 }}
                />
                <Typography variant="h6">
                  {friend.user.firstName + " " + friend.user.lastName}
                </Typography>
                <Box>
                  <Button
                    color="success"
                    variant="contained"
                    size="small"
                    onClick={() => onAcceptRequest(friend.user.userId)}
                  >
                    Confirm
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    sx={{ margin: "0 0 0 5px" }}
                    onClick={() => onDeleteRequest(friend.user.userId)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default FriendRequestList;
