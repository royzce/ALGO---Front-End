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
  Button,
  Box,
  Link,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useState } from "react";
import { PostContext } from "../context/PostContext";
import { getElapsedTime } from "../services/util";
import { UserContext } from "../context/UserContext";
import { Link as RouterLink } from "react-router-dom";

export default function PostHeader({
  post,
  onMenuEdit,
  onPrivIcon,
  shared,
  setShowTagLi,
}) {
  const { onDeletePost } = useContext(PostContext);
  const { postId, date, privacy, tags, isEdited } = post || {};
  const { userId, firstName, lastName, username, avatar } =
    (post && post.user) || {};

  const { currentUser } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleMore(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleEdit() {
    onMenuEdit();
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
    <List sx={{ padding: "0px" }}>
      {currentUser && (
        <ListItem
          disableGutters
          disablePadding
          alignItems="flex-start"
          secondaryAction={
            currentUser.userId === userId &&
            !shared && (
              <IconButton onClick={handleMore}>
                <MoreHorizIcon />
              </IconButton>
            )
          }
        >
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
          <ListItemAvatar>
            <RouterLink to={`/${username}`}>
              <Avatar alt="avatar" src={avatar} />
            </RouterLink>
          </ListItemAvatar>
          <ListItemText
            disableTypography
            primary={
              <Stack direction="row" spacing={1}>
                <Link
                  component={RouterLink}
                  to={`/${username}`}
                  variant="body1"
                  underline="hover"
                >
                  {firstName} {lastName}
                </Link>

                {tags && tags.length > 0 && (
                  <Link
                    component="button"
                    variant="body1"
                    underline="none"
                    onClick={() => setShowTagLi(true)}
                  >
                    {`and `}
                    {tags.length} {tags.length === 1 ? "other" : "others"}
                  </Link>
                )}
              </Stack>
            }
            secondary={
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography component="span" variant="body2">
                  @{username}
                </Typography>
                <Typography component="span" variant="body2">
                  {date && displayDate()}
                </Typography>
                {isEdited && (
                  <Typography component="span" variant="body2">
                    {"(edited)"}
                  </Typography>
                )}
                <IconButton
                  size="small"
                  onClick={onPrivIcon}
                  disabled={shared || currentUser.userId !== userId}
                >
                  {displayPrivacy()}
                </IconButton>
              </Stack>
            }
          />
        </ListItem>
      )}
    </List>
  );
}
