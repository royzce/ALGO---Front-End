import { IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SickIcon from "@mui/icons-material/Sick";

import { Stack } from "@mui/system";
import React from "react";

export default function PostReactions() {
  return (
    <Stack direction="row">
      <IconButton>
        <ThumbUpIcon />
      </IconButton>
      <IconButton>
        <FavoriteIcon />
      </IconButton>
      <IconButton>
        <SickIcon />
      </IconButton>
    </Stack>
  );
}
