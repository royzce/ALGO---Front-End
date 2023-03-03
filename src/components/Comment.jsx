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
  Link,
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
import { getElapsedTime } from "../services/util";
import { UserContext } from "../context/UserContext";
import { Link as RouterLink } from "react-router-dom";
import ConfirmDialog from "./ConfirmDialog";
import { useTheme } from "@mui/material/styles";

export default function Comment({ comment, replies, reply }) {
  const { value, date, user, isEdited } = comment || {};
  const [viewReplies, setViewReplies] = useState(false);
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const { onEdit, onDelete } = useContext(CommentContext);

  const { currentUser } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [showConfirmDel, setShowConfirmDel] = useState(false);

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
      const edited = { ...comment, value };
      onEdit(edited);
    }
  }

  function handleDelete() {
    handleCloseForm();
    onDelete(comment.commentId);
    setShowConfirmDel(false);
  }

  function displayDate() {
    if (date) {
      const display = new Date(date);
      return getElapsedTime(display);
    }
  }

  const theme = useTheme();
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
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "#2F2F2F" : "#FFFFFF",
              borderRadius: "12px",
              my: "8px",
            }}
            alignItems="flex-start"
            secondaryAction={
              currentUser.userId === user.userId && (
                <IconButton size="small" onClick={handleMoreClick}>
                  <MoreHorizIcon />
                </IconButton>
              )
            }
          >
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              PaperProps={{
                sx: {
                  overflow: "visible",
                  borderRadius: "10px",
                  mt: "0px",
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 12,
                    width: 10,
                    height: 10,
                    bgcolor:
                      theme.palette.mode === "dark" ? "#2F2F2F" : "#FFFFFF",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={() => setEditing(true)}>Edit</MenuItem>
              <MenuItem onClick={() => setShowConfirmDel(true)}>
                Delete
              </MenuItem>
            </Menu>
            <ListItemAvatar>
              <RouterLink to={user && `/${user.username}`}>
                <Avatar src={user && user.avatar} />
              </RouterLink>
            </ListItemAvatar>
            <ListItemText
              disableTypography
              primary={
                <>
                  <Link
                    component={RouterLink}
                    variant="subtitle2"
                    to={user && `/${user.username}`}
                    underline="hover"
                  >
                    {user && `${user.firstName} ${user.lastName}`}
                  </Link>
                  <Typography variant="body2">{value}</Typography>
                </>
              }
              secondary={
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="caption">{displayDate()}</Typography>
                  {isEdited && (
                    <Typography variant="caption">{"(edited)"}</Typography>
                  )}
                </Stack>
              }
            />
          </ListItem>
          {!reply && (
            <ListItem disablePadding>
              <ListItemText
                inset
                disableTypography
                sx={{ my: 0 }}
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
            sx={{ marginLeft: 5, my: 0 }}
            primary={
              <AddComment comment={comment} onShowComments={setViewReplies} />
            }
          />
        </ListItem>
      )}
      {showConfirmDel && (
        <ConfirmDialog
          open={showConfirmDel}
          onClose={() => setShowConfirmDel(false)}
          onConfirm={handleDelete}
        >
          Delete this comment?
        </ConfirmDialog>
      )}
    </>
  );
}
