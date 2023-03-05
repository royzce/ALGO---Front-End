import { Box, Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { ProfileNavContext } from "../context/ProfileNavContext";

const ProfileNavBar = ({ profileName, isCurrentUser }) => {
  const { profileTab } = useContext(ProfileNavContext);

  const styles = {
    box: {
      width: "100%",
      borderTop: "1px solid silver",
    },
  };

  return (
    <Box sx={styles.box}>
      <Tabs value={profileTab} variant="scrollable" scrollButtons="auto">
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
            value="Photos"
            label="Photos"
            LinkComponent={Link}
            to={`/${profileName}/photos`}
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
