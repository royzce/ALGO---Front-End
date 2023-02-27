import { Avatar, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import React, { useContext, useEffect, useState } from "react";
import { Stack } from "@mui/system";
import { UserContext } from "../context/UserContext";

export default function CommentForm({
  comment,
  editing,
  onSubmit,
  onCloseForm,
}) {
  const [value, setValue] = useState("");
  const { currentUser: user } = useContext(UserContext);

  useEffect(() => {
    if (editing && comment) {
      setValue(comment.value);
    }
  }, [comment, editing]);

  function handleChange(event) {
    const { value: input } = event.currentTarget;
    setValue(input);
  }

  function handleSubmit() {
    onSubmit(value);
    setValue("");
  }

  return (
    <>
      <Stack direction="row" spacing={1} alignItems="flex-start" padding={2}>
        <Avatar alt="avatar" src={user && user.avatar} />
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
