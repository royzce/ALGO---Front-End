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

const friendRequest = [
  {
    name: "John Smith",
    img: "https://i.pinimg.com/originals/a7/d2/e6/a7d2e62776ce45b76a88ae2eeaf44803.jpg",
  },
  {
    name: "Destinee Owens",
    img: "https://i.pinimg.com/474x/cb/33/d8/cb33d80fe655e221ae05f41c8edd0cdb.jpg",
  },
  {
    name: "Ricky Dougherty",
    img: "https://i.pinimg.com/474x/ee/e6/51/eee651694ba2b3112ffb3eb4525547e9--denzel-washington-cinema.jpg",
  },
  {
    name: "Terrance Andrade",
    img: "https://i.pinimg.com/originals/9d/13/b0/9d13b0ef9e1a3bce90c3946842a8592f.jpg",
  },
  {
    name: "Alfredo Kane",
    img: "https://i.pinimg.com/736x/65/8e/4e/658e4eef6027fe5cfbd580b21d10fc1e--male-portraits-photography-portraits.jpg",
  },
  {
    name: "Issac Hansen",
    img: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
  },
];

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
      })
      .catch((err) => {
        console.log("Error");
      });
  };

  const onDeleteRequest = async (friendId) => {
    await userService
      .rejectRequest(friendId)
      .then((res) => {
        alert("Deleted friend request");
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
