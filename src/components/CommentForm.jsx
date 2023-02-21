import { Avatar, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import { Stack } from "@mui/system";

export default function CommentForm() {
  return (
    <>
      <Stack direction="row" spacing={1} alignItems="flex-start" padding={2}>
        <Avatar
          alt="profile-picture"
          src="https://i.pinimg.com/originals/f9/a0/b4/f9a0b4f86ab0226ec83dfff20c08ba78.jpg"
        />
        <TextField
          hiddenLabel
          multiline
          margin="dense"
          size="small"
          placeholder="Write a comment..."
          fullWidth
        />
        <IconButton size="small">
          <SendIcon />
        </IconButton>
      </Stack>
    </>
  );
}
