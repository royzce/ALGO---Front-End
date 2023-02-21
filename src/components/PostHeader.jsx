import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
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
import React, { useState } from "react";

export default function PostHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <List>
      <ListItem
        disableGutters
        disablePadding
        alignItems="flex-start"
        secondaryAction={
          <IconButton onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
        }
      >
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Edit</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
        <ListItemAvatar>
          <Avatar
            alt="prof-pic"
            src="https://i.pinimg.com/originals/f9/a0/b4/f9a0b4f86ab0226ec83dfff20c08ba78.jpg"
          />
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={<Typography variant="body1">Johnny Favorite</Typography>}
          secondary={
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography component="span" variant="body2">
                @johnnyfave -
              </Typography>
              <Typography component="span" variant="body2">
                16h -
              </Typography>
              <PublicOutlinedIcon sx={{ fontSize: 18 }} />
            </Stack>
          }
        />
      </ListItem>
    </List>
  );
}
