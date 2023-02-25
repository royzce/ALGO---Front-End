import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LockIcon from "@mui/icons-material/Lock";
import GroupIcon from "@mui/icons-material/Group";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useState } from "react";
import { PostContext } from "../context/PostContext";
import { getElapsedTime } from "../services/util";

export default function PostHeader({ post, onEdit, onEditPrivacy }) {
  const { onDeletePost } = useContext(PostContext);
  const { postId, date, privacy, tags } = post || {};
  const { firstName, lastName, username, avatar } = (post && post.user) || {};

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleMore(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleEdit() {
    onEdit();
    handleClose();
  }

  function handleDelete() {
    onDeletePost(postId);
    handleClose();
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function displayDate() {
    const display = new Date(date);
    return getElapsedTime(display);
  }

  function displayPrivacy() {
    let icon = <></>;
    switch (privacy) {
      case "private":
        icon = <LockIcon sx={styles.iconSize} />;
        break;
      case "friends":
        icon = <GroupIcon sx={styles.iconSize} />;
        break;
      case "public":
        icon = <PublicOutlinedIcon sx={styles.iconSize} />;
        break;
      default:
        break;
    }
    return icon;
  }

  const styles = {
    iconSize: {
      fontSize: 16,
    },
  };

  return (
    <List>
      <ListItem
        disableGutters
        disablePadding
        alignItems="flex-start"
        secondaryAction={
          <IconButton onClick={handleMore}>
            <MoreHorizIcon />
          </IconButton>
        }
      >
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
        <ListItemAvatar>
          <Avatar alt="avatar" src={avatar} />
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="body1">
              {firstName} {lastName}
              {tags && tags.length > 0 && ` and ${tags.length} others`}
            </Typography>
          }
          secondary={
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography component="span" variant="body2">
                @{username}
              </Typography>
              <Typography component="span" variant="body2">
                {date && displayDate()}
              </Typography>
              <IconButton size="small" onClick={onEditPrivacy}>
                {displayPrivacy()}
              </IconButton>
            </Stack>
          }
        />
      </ListItem>
    </List>
  );
}
