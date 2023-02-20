import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

export default function PostActions() {
  return (
    <Stack direction="row" justifyContent="center" spacing={1}>
      <Button>Like</Button>
      <Button>Comment</Button>
      <Button>Share</Button>
    </Stack>
  );
}
