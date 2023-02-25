import { Button, Popover } from "@mui/material";
import { Stack } from "@mui/system";
import ChatOutlined from "@mui/icons-material/ChatOutlined";
import ShareOutlined from "@mui/icons-material/ShareOutlined";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import PostReactions from "./PostReactions";
import React, { useState } from "react";
import { REACTIONS } from "../services/post";

export default function PostActions({ onReact, reaction, onShare }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "popover" : undefined;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDefault = () => {
    if (reaction) {
      onReact(null);
    } else {
      onReact("fire");
    }
  };

  const reactBtnIcon = () => {
    if (reaction) {
      const react = REACTIONS.find((react) => react.text === reaction.value);
      return <img src={react.img} height={18} />;
    }
    return <LocalFireDepartmentIcon />;
  };

  const reactBtnText = () => {
    if (reaction) {
      const react = REACTIONS.find((react) => react.text === reaction.value);
      return react.text;
    }
    return "FIRE";
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={1}
    >
      <Button
        onClick={handleDefault}
        sx={{ px: "24px" }}
        startIcon={reactBtnIcon()}
        onMouseEnter={handlePopoverOpen}
      >
        {reactBtnText()}
      </Button>
      <Button sx={{ px: "24px" }} startIcon={<ChatOutlined />}>
        Comment
      </Button>
      <Button
        sx={{ px: "24px" }}
        startIcon={<ShareOutlined />}
        onClick={onShare}
      >
        Share
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        onBlur={handlePopoverClose}
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
        style={{ pointerEvents: "none" }}
      >
        <PostReactions onReact={onReact} />
      </Popover>
    </Stack>
  );
}
