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
import React from "react";
import EditIcon from "@mui/icons-material/Edit";

const Details = () => {
  const styles = {
    list: {
      padding: "10px 20px",
    },
    listItem: {
      // backgroundColor: "red",
      padding: "8px 0",
    },
  };
  return (
    <Card sx={{ borderRadius: "10px" }}>
      <Typography
        variant="h5"
        fontWeight="fontWeightBold"
        sx={{ padding: "20px" }}
      >
        Details
      </Typography>
      <List style={styles.list} disablePadding>
        <ListItem style={styles.listItem}>
          <ListItemButton>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>Edit Details</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem style={styles.listItem}>
          <ListItemText>Username</ListItemText>
        </ListItem>
        <ListItem style={styles.listItem}>
          <ListItemText>First Name</ListItemText>
        </ListItem>
        <ListItem style={styles.listItem}>
          <ListItemText>Last Name</ListItemText>
        </ListItem>
        <ListItem style={styles.listItem}>
          <ListItemText>Email</ListItemText>
        </ListItem>
      </List>
    </Card>
  );
};

export default Details;
