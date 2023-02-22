import { Avatar, AvatarGroup, Button, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SickIcon from "@mui/icons-material/Sick";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Stack } from "@mui/system";
import React from "react";

export default function PostStats({ onToggleComments }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      justifyContent="space-between"
    >
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <AvatarGroup>
          <Avatar sx={{ width: 24, height: 24 }}>
            <ThumbUpIcon sx={{ fontSize: 12 }} />
          </Avatar>
          <Avatar sx={{ width: 24, height: 24 }}>
            <FavoriteIcon sx={{ fontSize: 12 }} />
          </Avatar>
          <Avatar sx={{ width: 24, height: 24 }}>
            <SickIcon sx={{ fontSize: 12 }} />
          </Avatar>
        </AvatarGroup>
        <Typography variant="body2">Louis Cyphre and 11 others</Typography>
      </Stack>
      <Stack direction="row">
        <Stack
          component={Button}
          size="small"
          direction="row"
          alignItems="center"
          spacing={1}
          onClick={onToggleComments}
        >
          <Typography variant="body2">{2}</Typography>
          <ModeCommentOutlinedIcon sx={{ fontSize: 18 }} />
        </Stack>
        <Stack
          component={Button}
          size="small"
          direction="row"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="body2">4</Typography>
          <ShareOutlinedIcon sx={{ fontSize: 18 }} />
        </Stack>
      </Stack>
    </Stack>
  );
}
