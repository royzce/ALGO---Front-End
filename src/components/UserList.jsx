import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { Link } from "react-router-dom";

export default function UserList({ list, open, onClose, children }) {
  const styles = {
    modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      width: "50%",
      maxHeight: "90%",
      overflowY: "scroll",
      borderRadius: "10px",
      padding: "10px",
    },
  };
  return (
    <Modal open={open} onClose={onClose} sx={styles.modal}>
      <Card sx={styles.card}>
        <CardHeader
          title={children}
          action={
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent sx={{ paddingY: 0 }}>
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
        </CardContent>
      </Card>
    </Modal>
  );
}
