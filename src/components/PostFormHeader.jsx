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
import ColorTheme from "../components/ColorTheme";
import { useTheme } from "@mui/material/styles";

export default function PostFormHeader({
  isNewPost,
  onSelect,
  privacy,
  onToggleTags,
  onTogglePhotos,
  onTogglePhotosButton,
  onToggleTagButton,
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

  const theme = useTheme();

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

  const styles = {
    photoAvatar: {
      bgcolor: onTogglePhotosButton,
    },
    tagAvatar: {
      bgcolor: onToggleTagButton,
    },
    privacyAvatar: {
      bgcolor:
        theme.palette.mode === "dark"
          ? "#2F2F2F"
          : ColorTheme.palette.body.main,
    },
  };

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
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        {!isRepost && (
          <Avatar sx={styles.photoAvatar}>
            <IconButton onClick={onTogglePhotos} color="primary" size="small">
              <AddPhotoAlternateIcon />
            </IconButton>
          </Avatar>
        )}
        {privacy !== "private" && isNewPost && (
          <Avatar sx={styles.tagAvatar}>
            <IconButton onClick={onToggleTags} color="primary" size="small">
              <GroupAddIcon />
            </IconButton>
          </Avatar>
        )}
        <Avatar sx={styles.privacyAvatar}>
          <IconButton onClick={handlePrivMenu} color="primary" size="small">
            {displayPrivacy()}
          </IconButton>
        </Avatar>
        <FormControl size="small">
          <Menu
            open={openPrivMenu}
            anchorEl={privAnchorEl}
            onClose={handlePrivMenuClose}
            PaperProps={{
              sx: {
                overflow: "visible",
                borderRadius: "10px",
                mt: "10px",
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 10,
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
