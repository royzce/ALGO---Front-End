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
import React, { useState } from "react";
import { Stack } from "@mui/system";
import Replies from "./Replies";

export default function Comment({ reply }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <IconButton size="small" onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
        }
      >
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Edit</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
        <ListItemAvatar>
          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc4inV06qHSsrEg1LnwzB1y8rniPoPVBK0CQ&usqp=CAU" />
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <>
              <Typography variant="subtitle2">Louis Cyphre</Typography>
              <Typography variant="body2">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium
              </Typography>
            </>
          }
          secondary={
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="caption">8h</Typography>
            </Stack>
          }
        />
      </ListItem>
      <ListItem>
        {!reply && (
          <ListItemText
            inset
            disableTypography
            primary={
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Button size="small">Reply</Button>
                <Button size="small">View Replies (1)</Button>
              </Stack>
            }
          />
        )}
      </ListItem>
      {reply ? "" : <Replies />}
    </>
  );
}
