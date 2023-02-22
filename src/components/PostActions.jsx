import { Button, Popover } from "@mui/material";
import { Stack } from "@mui/system";
import ThumbDownOffAltRounded from "@mui/icons-material/ThumbDownOffAltRounded";
import ChatOutlined from "@mui/icons-material/ChatOutlined";
import ShareOutlined from "@mui/icons-material/ShareOutlined";
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
        startIcon={
          <ThumbDownOffAltRounded sx={{ transform: "scaleY(-1) scaleX(-1)" }} />
        }
        onMouseEnter={handlePopoverOpen}
        // onMouseLeave={handlePopoverClose}
      >
        Like
      </Button>
      <Button sx={{ px: "24px" }} startIcon={<ChatOutlined />}>
        Comment
      </Button>
      <Button sx={{ px: "24px" }} startIcon={<ShareOutlined />}>
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
