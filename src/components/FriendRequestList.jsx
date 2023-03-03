import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Link,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { FriendContext } from "../context/FriendContext";
import * as userService from "../services/user";
import UserActionButtons from "./UserActionButtons";
import { Link as RouterLink } from "react-router-dom";
import { Stack } from "@mui/system";

const FriendRequestList = () => {
  const { friendRequests, setFriendRequests } = useContext(FriendContext);

  useEffect(() => {
    userService.getFriendRequest().then((reqs) => {
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
                <Stack direction="row" alignItems="center" spacing={2}>
                  <RouterLink to={`/${friend.username}`}>
                    <Avatar
                      src={friend.user.avatar}
                      alt={friend.user.username}
                      variant="rounded"
                      sx={{ width: 80, height: 86 }}
                    />
                  </RouterLink>
                  <Link
                    variant="h6"
                    component={RouterLink}
                    to={`/${friend.user.username}`}
                    underline="hover"
                  >
                    {friend.user.firstName + " " + friend.user.lastName}
                  </Link>
                </Stack>
                <Box>
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
