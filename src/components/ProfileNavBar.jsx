import { Box, Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const ProfileNavBar = ({ profileName, isCurrentUser }) => {
  const [value, setValue] = useState("Post");
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
          to={`/${profileName}`}
        />

        {isCurrentUser && (
          <Tab
            value="About"
            label="About"
            LinkComponent={Link}
            to={`/${profileName}/about`}
          />
        )}
        {isCurrentUser && (
          <Tab
            value="Friends"
            label="Friends"
            LinkComponent={Link}
            to={`/${profileName}/friends`}
          />
        )}
      </Tabs>
    </Box>
  );
};

export default ProfileNavBar;
