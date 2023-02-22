import { Button, Popover } from "@mui/material";
import { Stack } from "@mui/system";
import ThumbUpAltRounded from "@mui/icons-material/ThumbUpAltRounded";
import ChatRounded from "@mui/icons-material/ChatRounded";
import ReplyOutlined from "@mui/icons-material/ReplyOutlined";
import PostReactions from "./PostReactions";
import React, { useState } from "react";

export default function PostActions() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "popover" : undefined;
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={1}
    >
      <Button
        sx={{ px: "24px" }}
        startIcon={<ThumbUpAltRounded />}
        onMouseEnter={handlePopoverOpen}
        // onMouseLeave={handlePopoverClose}
      >
        Like
      </Button>
      <Button sx={{ px: "24px" }} startIcon={<ChatRounded />}>
        Comment
      </Button>
      <Button
        sx={{ px: "24px" }}
        startIcon={<ReplyOutlined sx={{ transform: "scaleX(-1)" }} />}
      >
        Share
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          style: {
            borderRadius: "25px",
          },
        }}
      >
        <PostReactions />
      </Popover>
    </Stack>
  );
}
