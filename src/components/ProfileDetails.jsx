import {
  Card,
  CardHeader,
  Divider,
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
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h6">Edit Profile </Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem style={styles.listItem}>
          <ListItemText>
            <Typography variant="h6">
              Username: {profileData.username}
            </Typography>
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem style={styles.listItem}>
          <ListItemText>
            <Typography variant="h6">
              First Name: {profileData.firstName}
            </Typography>
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem style={styles.listItem}>
          <ListItemText>
            <Typography variant="h6">
              Last Name: {profileData.lastName}
            </Typography>
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem style={styles.listItem}>
          <ListItemText>
            <Typography variant="h6">Email: {profileData.email}</Typography>
          </ListItemText>
        </ListItem>
      </List>
    </Card>
  );
};

export default Details;
