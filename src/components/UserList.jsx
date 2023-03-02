import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function UserList({ list }) {
  return (
    <List>
      {list &&
        list.map((item) => {
          const { user } = item;
          return (
            <ListItemButton
              LinkComponent={Link}
              to={`/${user.username}`}
              key={user.userId}
            >
              <ListItemAvatar>
                <Avatar alt={user.username} src={user.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={`${user.firstName} ${user.lastName}`}
                secondary={`@${user.username}`}
              />
            </ListItemButton>
          );
        })}
    </List>
  );
}
