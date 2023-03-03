import React, { useContext, useEffect, useState } from "react";
import * as userService from "../services/user";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import UserActionButtons from "./UserActionButtons";
import { FriendContext } from "../context/FriendContext";
import { Link as RouterLink } from "react-router-dom";

const DiscoverFriends = ({ users }) => {
  const [allUsers, setAllUsers] = useState([]);
  const { onAdd } = useContext(FriendContext);
  useEffect(() => {
    if (users) {
      setAllUsers(users);
    } else {
      userService.getNonFriend().then((res) => {
        setAllUsers(res.data);
      });
    }
  }, [users]);

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
  return allUsers && allUsers.length > 0 ? (
    <Grid container spacing={2} justifyContent="center">
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
                    width="100%"
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <RouterLink to={`/${friend.username}`}>
                        <Avatar
                          src={friend.avatar}
                          alt={friend.username}
                          variant="rounded"
                          sx={{ width: 80, height: 86 }}
                        />
                      </RouterLink>
                      <Link
                        variant="h6"
                        component={RouterLink}
                        to={`/${friend.username}`}
                        underline="hover"
                      >
                        {friend.firstName + " " + friend.lastName}
                      </Link>
                    </Stack>
                    <UserActionButtons
                      username={friend.username}
                      userId={friend.userId}
                      handleActionDiscover={onAdd}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  ) : (
    <Typography variant="body1">No users to display at the moment.</Typography>
  );
};

export default DiscoverFriends;
