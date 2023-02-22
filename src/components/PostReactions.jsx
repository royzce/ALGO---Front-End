import { IconButton } from "@mui/material";
import fire from "../assets/fire.gif";
import haha from "../assets/haha.gif";
import shit from "../assets/shit.gif";
import broken from "../assets/broken.gif";
import mad from "../assets/mad.gif";

import { Stack } from "@mui/system";
import React from "react";

export default function PostReactions({ handleLike, handlePopoverClose }) {
  return (
    <Stack direction="row" sx={{ padding: "5px", pointerEvents: "auto" }}>
      <IconButton
        onClick={(event) => {
          handleLike(event);
          handlePopoverClose();
        }}
      >
        <img src={fire} height={25} />
      </IconButton>
      <IconButton>
        <img src={haha} height={25} />
      </IconButton>
      <IconButton>
        <img src={shit} height={25} />
      </IconButton>
      <IconButton>
        <img src={broken} height={25} />
      </IconButton>
      <IconButton>
        <img src={mad} height={25} />
      </IconButton>
    </Stack>
  );
}
