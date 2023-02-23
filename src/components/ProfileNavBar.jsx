import { Box, Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const ProfileNavBar = () => {
  const [value, setValue] = useState("Post");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="Post" label="Post" LinkComponent={Link} to={"/profile"} />
        <Tab
          value="About"
          label="About"
          LinkComponent={Link}
          to={"/profile/about"}
        />
        <Tab
          value="Friends"
          label="Friends"
          LinkComponent={Link}
          to={"/profile/friends"}
        />
      </Tabs>
    </Box>
    // <Stack direction="row" spacing={2}>
    //   <Button size="large" LinkComponent={Link} to={"/profile"}>
    //     Post
    //   </Button>
    //   <Button size="large" LinkComponent={Link} to={"/profile/about"}>
    //     About
    //   </Button>
    //   <Button size="large" LinkComponent={Link} to={"/profile/friends"}>
    //     Friends
    //   </Button>
    // </Stack>
  );
};

export default ProfileNavBar;
