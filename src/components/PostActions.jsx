import { Button, Popover } from "@mui/material";
import { Stack } from "@mui/system";
import ChatOutlined from "@mui/icons-material/ChatOutlined";
import ShareOutlined from "@mui/icons-material/ShareOutlined";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import PostReactions from "./PostReactions";
import React, { useEffect, useState } from "react";
import { REACTIONS } from "../services/post";

export default function PostActions({ onReact, reaction, onShare, privacy }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [reactBtn, setReactBtn] = useState(null);

  useEffect(() => {
    if (reaction) {
      setReactBtn(
        reaction
          ? REACTIONS.find((react) => react.text === reaction.value)
          : null
      );
    } else {
      setReactBtn(null);
    }
  }, [reaction]);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleReact = (value) => {
    onReact(value);
    handlePopoverClose();
  };

  const handleDefault = () => {
    if (reactBtn) {
      onReact(null);
    } else {
      onReact("fire");
    }
    handlePopoverClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "popover" : undefined;

  const styles = {
    buttonPadding: {
      px: "24px",
    },
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
        startIcon={
          reactBtn ? (
            <img src={reactBtn.img} height={18} />
          ) : (
            <LocalFireDepartmentIcon />
          )
        }
        onMouseEnter={handlePopoverOpen}
      >
        {reactBtn ? reactBtn.text : "Fire"}
      </Button>
      <Button sx={styles.buttonPadding} startIcon={<ChatOutlined />}>
        Comment
      </Button>
      {privacy !== "private" && (
        <Button
          sx={{ px: "24px" }}
          startIcon={<ShareOutlined />}
          onClick={onShare}
        >
          Share
        </Button>
      )}
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
        <PostReactions onReact={handleReact} />
      </Popover>
    </Stack>
  );
}
