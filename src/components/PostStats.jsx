import { Avatar, AvatarGroup, Button, Link, Typography } from "@mui/material";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Stack } from "@mui/system";
import React from "react";
import { REACTIONS } from "../services/post";

export default function PostStats({
  onToggleComments,
  reactions,
  totalComments,
  totalShares,
  user,
  setShowReactLi,
  setShowShareLi,
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
      paddingTop={2}
    >
      <Stack direction="row" alignItems="center" spacing={0.5}>
        {reactions && (
          <AvatarGroup spacing={4}>
            {REACTIONS.map((react) => {
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
        )}
        {reactions && (
          <Link
            variant="body2"
            underline="none"
            component="button"
            onClick={() => setShowReactLi(true)}
          >
            {reactions.length === 0
              ? ""
              : !reactions.find((react) => react.userId === user.userId)
              ? reactions.length
              : reactions.length === 1
              ? "You"
              : reactions.length < 3
              ? "You and 1 other"
              : `You and ${reactions.length} others`}
          </Link>
        )}
      </Stack>
      <Stack direction="row" spacing={1}>
        {totalComments > 0 && (
          <Stack
            component={Button}
            size="small"
            direction="row"
            alignItems="center"
            spacing={1}
            onClick={onToggleComments}
            sx={{ padding: 0, minWidth: "24px" }}
          >
            <Typography variant="body2">{totalComments}</Typography>

            <ModeCommentOutlinedIcon sx={{ fontSize: 18 }} />
          </Stack>
        )}
        {totalShares > 0 && (
          <Stack
            component={Button}
            sx={{ padding: 0, minWidth: "24px" }}
            size="small"
            direction="row"
            alignItems="center"
            spacing={1}
            onClick={() => setShowShareLi(true)}
          >
            <Typography variant="body2">{totalShares}</Typography>

            <ShareOutlinedIcon sx={styles.statsIconSize} />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
