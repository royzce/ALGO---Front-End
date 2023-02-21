import { Button, Stack } from "@mui/material";
// import React, { useState } from "react";

const ProfileNavBar = () => {
  //   const [underlined, setUnderlined] = useState(null);
  return (
    <Stack direction="row" spacing={2}>
      <Button size="large">Post</Button>
      <Button size="large">About</Button>
      <Button size="large">Friends</Button>
    </Stack>
  );
};

export default ProfileNavBar;
