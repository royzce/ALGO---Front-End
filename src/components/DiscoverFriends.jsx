import React, { useContext, useEffect, useState } from "react";
import * as userService from "../services/user";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { PopupContext } from "../context/PopupContext";
import UserActionButtons from "./UserActionButtons";

const DiscoverFriends = ({ users }) => {
  const [allUsers, setAllUsers] = useState([]);

  const dateNow = new Date();
  const { onShowSuccess, onShowFail } = useContext(PopupContext);
  useEffect(() => {
    if (users) {
      setAllUsers(users);
      console.log("users in discover", users);
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
        // alert(res.data);
        onShowSuccess("Friend request sent.");
        setAllUsers(allUsers.filter((user) => user.userId !== friendId));
      })
      .catch((err) => {
        onShowFail("An unexpected error occurred. Try again later");
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
                  <Stack
                    justifyContent="space-between"
                    spacing={1}
                    direction="row"
                    alignItems="center"
                  >
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
                      handleActionDiscover={onAdd}
                    />
                    {/* {showButton && (
                      <Button
                        color="error"
                        variant="contained"
                        size="small"
                        onClick={() => onAdd(friend.userId, dateNow)}
                      >
                        Add
                      </Button>
                    )} */}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default DiscoverFriends;
