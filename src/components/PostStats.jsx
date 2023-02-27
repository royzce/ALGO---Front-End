import { Avatar, AvatarGroup, Button, Typography } from "@mui/material";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Stack } from "@mui/system";
import React from "react";
import { REACTIONS } from "../services/post";

export default function PostStats({
  onToggleComments,
  post,
  reactions,
  totalComments,
  user,
}) {
  const styles = {
    avatarSize: {
      width: 24,
      height: 24,
    },
    reactsIconSize: {
      fontSize: 12,
    },
    statsIconSize: {
      fontSize: 18,
    },
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      justifyContent="space-between"
    >
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <AvatarGroup>
          {reactions &&
            REACTIONS.map((react) => {
              const result = reactions.find((r) => r.value === react.text);
              if (result) {
                return (
                  <Avatar
                    sx={{ width: 20, height: 20 }}
                    src={react.img}
                    key={react.text}
                  />
                );
              }
              return "";
            })}
        </AvatarGroup>
        {reactions && (
          <Typography variant="body2">
            {reactions.length === 0
              ? ""
              : !reactions.find((react) => react.userId === user.userId)
              ? reactions.length
              : reactions.length === 1
              ? "You"
              : reactions.length < 3
              ? "You and 1 other"
              : `You and ${reactions.length} others`}
          </Typography>
        )}
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
          {totalComments > 0 && (
            <Typography variant="body2">{totalComments}</Typography>
          )}
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
          <ShareOutlinedIcon sx={styles.statsIconSize} />
        </Stack>
      </Stack>
    </Stack>
  );
}
