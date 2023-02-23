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
}) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <ListItem>
        <ListItemAvatar>
          <Avatar
            alt="avatar"
            src="https://i.pinimg.com/originals/f9/a0/b4/f9a0b4f86ab0226ec83dfff20c08ba78.jpg"
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <Typography variant="span">Johnny Favorite</Typography>
              {totalTags > 0 && (
                <Typography variant="span">
                  {" and "}
                  {totalTags} {totalTags === 1 ? "other" : "others"}
                </Typography>
              )}
            </>
          }
          secondary="@johnnyfave"
        />
      </ListItem>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <IconButton onClick={onTogglePhotos} size="small">
          <AddPhotoAlternateIcon />
        </IconButton>
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