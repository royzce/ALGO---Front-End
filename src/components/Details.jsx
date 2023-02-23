import {
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";

const Details = () => {
  return (
    <Card>
      <CardHeader title="Details" />
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText>Edit Details</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemText>Username</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>First Name</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Last Name</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>Email</ListItemText>
        </ListItem>
      </List>
    </Card>
  );
};

export default Details;
