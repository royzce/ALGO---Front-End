import {
  Avatar,
  FormControl,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LockIcon from "@mui/icons-material/Lock";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import React from "react";
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
        <FormControl size="small">
          <Select value={privacy} onChange={onSelect}>
            <MenuItem value="public">
              <PublicOutlinedIcon /> Public
            </MenuItem>
            <MenuItem value="friends">
              <GroupIcon /> Friends
            </MenuItem>
            <MenuItem value="private">
              <LockIcon /> Private
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
}
