import {
  Avatar,
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React, { useContext, useState } from "react";
import { Stack } from "@mui/system";
import Replies from "./Replies";
import CommentForm from "./CommentForm";
import { CommentContext } from "../context/CommentContext";
import AddComment from "./AddComment";

export default function Comment({ comment, replies, reply }) {
  const { firstName, lastName, avatar, value, date } = comment || {};
  const [viewReplies, setViewReplies] = useState(false);
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const { onEdit, onDelete } = useContext(CommentContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  function handleMoreClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleCloseMenu() {
    setAnchorEl(null);
  }

  function handleCloseForm() {
    setAnchorEl(null);
    setEditing(false);
  }

  function handleViewReplies() {
    setViewReplies(!viewReplies);
  }

  function handleEdit(value) {
    handleCloseForm();
    if (value !== comment.value) {
      const edited = { ...comment, value, date: new Date().toJSON() };
      onEdit(edited);
    }
  }

  function handleDelete() {
    onDelete(comment.id);
  }

  function displayDate() {
    // TODO: add a proper time-elapsed display
    return date;
  }
  return (
    <>
      {editing ? (
        <CommentForm
          comment={comment}
          onCloseForm={handleCloseForm}
          editing={editing}
          onSubmit={handleEdit}
        />
      ) : (
        <>
          <ListItem
            sx={{ bgcolor: "#f0f2f5", borderRadius: "12px" }}
            alignItems="flex-start"
            secondaryAction={
              <IconButton size="small" onClick={handleMoreClick}>
                <MoreHorizIcon />
              </IconButton>
            }
          >
            <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
              <MenuItem onClick={() => setEditing(true)}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
            <ListItemAvatar>
              <Avatar src={avatar} />
            </ListItemAvatar>
            <ListItemText
              disableTypography
              primary={
                <>
                  <Typography variant="subtitle2">
                    {firstName} {lastName}
                  </Typography>
                  <Typography variant="body2">{value}</Typography>
                </>
              }
              secondary={
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="caption">{displayDate()}</Typography>
                </Stack>
              }
            />
          </ListItem>
          {!reply && (
            <ListItem disablePadding>
              <ListItemText
                inset
                disableTypography
                primary={
                  <Stack direction="row" spacing={1}>
                    {!reply && (
                      <Button
                        size="small"
                        onClick={() => setReplying(!replying)}
                        startIcon={
                          replying ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )
                        }
                      >
                        Reply
                      </Button>
                    )}
                    {(replies && replies.length) > 0 && (
                      <Button
                        size="small"
                        onClick={handleViewReplies}
                        startIcon={
                          viewReplies ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )
                        }
                      >
                        {viewReplies ? "Hide" : "View"} Replies (
                        {replies.length})
                      </Button>
                    )}
                  </Stack>
                }
              />
            </ListItem>
          )}
        </>
      )}
      {viewReplies && <Replies comment={comment} replies={replies} />}
      {replying && (
        <ListItem disableGutters disablePadding>
          <ListItemText
            disableTypography
            sx={{ marginLeft: 5 }}
            primary={<AddComment comment={comment} />}
          />
        </ListItem>
      )}
    </>
  );
}
