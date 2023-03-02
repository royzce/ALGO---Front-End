import { IconButton } from "@mui/material";

import { Stack } from "@mui/system";
import React from "react";
import { REACTIONS } from "../services/post";

export default function PostReactions({ onReact }) {
  return (
    <Stack direction="row" sx={{ padding: "5px", pointerEvents: "auto" }}>
      {REACTIONS.map((react) => (
        <IconButton onClick={() => onReact(react.text)} key={react.text}>
          <img src={react.gif} height={25} />
        </IconButton>
      ))}
    </Stack>
  );
}
