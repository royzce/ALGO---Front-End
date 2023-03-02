import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import UserList from "./UserList";

export default function SharesUserList({ shares, open, onClose }) {
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
          title={
            <Typography variant="subtitle1" fontWeight="fontWeightBold">
              People who shared this post
            </Typography>
          }
          action={
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent sx={{ paddingY: 0 }}>
          <UserList list={shares} />
        </CardContent>
      </Card>
    </Modal>
  );
}
