import React, { useEffect, useState } from "react";
import * as userService from "../services/user";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

const DiscoverFriends = ({ users }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [nonFriend, setNonFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendRequest, setFriendRequest] = useState([]);
  const dateNow = new Date();

  useEffect(() => {
    if (users) {
      setAllUsers(users);
    } else {
      userService.getNonFriend().then((res) => {
        console.log("non friend user", res);
        setAllUsers(res.data);
      });
    }
  }, [users]);

  const onAdd = async (friendId, dateNow) => {
    console.log("On Add", friendId);
    await userService
      .addFriend(friendId, dateNow)
      .then((res) => {
        alert(res.data);
        setAllUsers(allUsers.filter((user) => user.userId !== friendId));
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
      {allUsers &&
        allUsers.map((friend, index) => {
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
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => onAdd(friend.userId, dateNow)}
                  >
                    Add
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default DiscoverFriends;
