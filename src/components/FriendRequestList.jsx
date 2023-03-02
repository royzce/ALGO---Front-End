import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { FriendContext } from "../context/FriendContext";
import * as userService from "../services/user";
import UserActionButtons from "./UserActionButtons";

const FriendRequestList = () => {
  const { friendRequests, setFriendRequests } = useContext(FriendContext);

  useEffect(() => {
    userService.getFriendRequest().then((reqs) => {
      console.log("FriendRequestList friend requests", reqs);
      setFriendRequests(reqs.data);
    });
  }, [friendRequests]);

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
  return friendRequests && friendRequests.length > 0 ? (
    <Grid container spacing={2}>
      {friendRequests.map((friend, index) => {
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
                  {/* <Button
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
                  </Button> */}
                  <UserActionButtons
                    username={friend.user.username}
                    userId={friend.user.userId}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  ) : (
    <Typography variant="body1">No friend requests at the moment.</Typography>
  );
};

export default FriendRequestList;
