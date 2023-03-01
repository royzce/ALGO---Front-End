import {
  Avatar,
  FormControl,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LockIcon from "@mui/icons-material/Lock";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import React, { useState } from "react";
import { Stack } from "@mui/system";

export default function PostFormHeader({
  onSelect,
  privacy,
  onToggleTags,
  onTogglePhotos,
  totalTags,
  user,
  isRepost,
}) {
  const [privAnchorEl, setPrivAnchorEl] = useState(null);
  const openPrivMenu = !!privAnchorEl;

  function handlePrivMenu(event) {
    setPrivAnchorEl(event.currentTarget);
  }

  function handlePrivMenuClose() {
    setPrivAnchorEl(null);
  }

  function handlePrivSelect(value) {
    onSelect(value);
    handlePrivMenuClose();
  }

  function displayPrivacy() {
    let icon = <></>;
    switch (privacy) {
      case "private":
        icon = <LockIcon />;
        break;
      case "friends":
        icon = <GroupIcon />;
        break;
      case "public":
        icon = <PublicOutlinedIcon />;
        break;
      default:
        break;
    }
    return icon;
  }

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <ListItem>
        <ListItemAvatar>
          <Avatar alt="avatar" src={user && user.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Typography variant="span">
                {user && `${user.firstName} ${user.lastName}`}
              </Typography>
              {totalTags > 0 && (
                <Typography variant="span">
                  {" and "}
                  {totalTags} {totalTags === 1 ? "other" : "others"}
                </Typography>
              )}
            </>
          }
          secondary={user && `@${user.username}`}
        />
      </ListItem>
      <Stack direction="row" justifyContent="center" alignItems="center">
        {!isRepost && (
          <IconButton onClick={onTogglePhotos} size="small">
            <AddPhotoAlternateIcon />
          </IconButton>
        )}
        {privacy !== "private" && (
          <IconButton onClick={onToggleTags} size="small">
            <GroupAddIcon />
          </IconButton>
        )}
        <IconButton onClick={handlePrivMenu} size="small">
          {displayPrivacy()}
        </IconButton>
        <FormControl size="small">
          <Menu
            open={openPrivMenu}
            anchorEl={privAnchorEl}
            onClose={handlePrivMenuClose}
          >
            <MenuItem onClick={() => handlePrivSelect("public")}>
              <PublicOutlinedIcon />
              {` Public`}
            </MenuItem>
            <MenuItem onClick={() => handlePrivSelect("friends")}>
              <GroupIcon />
              {` Friends`}
            </MenuItem>
            {!isRepost && (
              <MenuItem onClick={() => handlePrivSelect("private")}>
                <LockIcon />
                {` Private`}
              </MenuItem>
            )}
          </Menu>
        </FormControl>
      </Stack>
    </Stack>
  );
}
