import { Avatar, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";

export default function CommentForm({
  comment,
  editing,
  onSubmit,
  onCloseForm,
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (editing && comment) {
      setValue(comment.value);
    }
  }, [comment]);

  function handleChange(event) {
    const { value: input } = event.currentTarget;
    setValue(input);
  }

  function handleSubmit() {
    onSubmit(value);
  }

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
          value={value}
          onChange={handleChange}
        />
        {editing ? (
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <IconButton size="small" disabled={!value} onClick={handleSubmit}>
              <CheckIcon />
            </IconButton>
            <IconButton size="small" disabled={!value} onClick={onCloseForm}>
              <CloseIcon />
            </IconButton>
          </Stack>
        ) : (
          <IconButton size="small" disabled={!value} onClick={handleSubmit}>
            <SendIcon />
          </IconButton>
        )}
      </Stack>
    </>
  );
}
