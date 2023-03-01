import { Box, Tab, Tabs } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";

const ProfileNavBar = () => {
  const [value, setValue] = useState("Post");
  let { id } = useParams();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const styles = {
    box: {
      width: "100%",
      borderTop: "1px solid silver",
    },
  };
  return (
    <Box sx={styles.box}>
      <Tabs value={value} onChange={handleChange}>
        <Tab
          value="Post"
          label="Post"
          LinkComponent={Link}
          to={`/profile/${id}`}
        />
        <Tab
          value="About"
          label="About"
          LinkComponent={Link}
          to={`/profile/${id}/about`}
        />
        <Tab
          value="Friends"
          label="Friends"
          LinkComponent={Link}
          to={`/profile/${id}/friends`}
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
