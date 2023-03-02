import {
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "react-router";
import * as userService from "../services/user";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const Details = () => {
  const { username } = useParams();
  const [profileData, setProfileData] = useState({});
  const { currentUser: user } = useContext(UserContext);
  const { currentUser } = useContext(UserContext);
  const isCurrentUser = currentUser && username === currentUser.username;
  useEffect(() => {
    if (isCurrentUser) {
      setProfileData(user);
    } else {
      userService.getProfileData(username).then((res) => {
        setProfileData(res.data);
      });
    }
  }, [user, username, currentUser, isCurrentUser]);
  const styles = {
    list: {
      padding: "10px 20px",
    },
    listItem: {
      // backgroundColor: "red",
      padding: "8px 0",
    },
    borderRadius: {
      borderRadius: "10px",
    },
  };
  return (
    <Card sx={styles.borderRadius}>
      <CardHeader
        title={
          <Typography variant="h5" fontWeight="fontWeightBold">
            Details
          </Typography>
        }
      ></CardHeader>
      <List style={styles.list} disablePadding>
        <ListItem style={styles.listItem}>
          <ListItemButton
            LinkComponent={Link}
            to={`/${profileData.username}/edit`}
            state={{ profileData }}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>Edit Profile</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem style={styles.listItem}>
          <ListItemText>Username: {profileData.username}</ListItemText>
        </ListItem>
        <ListItem style={styles.listItem}>
          <ListItemText>First Name: {profileData.firstName}</ListItemText>
        </ListItem>
        <ListItem style={styles.listItem}>
          <ListItemText>Last Name: {profileData.lastName}</ListItemText>
        </ListItem>
        <ListItem style={styles.listItem}>
          <ListItemText>Email: {profileData.email}</ListItemText>
        </ListItem>
      </List>
    </Card>
  );
};

export default Details;
