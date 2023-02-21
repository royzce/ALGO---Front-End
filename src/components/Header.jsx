import { Avatar, AvatarGroup, Box, Grid, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <Grid>
      <Box>
        <Box position="static">
          <img
            width="100%"
            src="https://wallpaperaccess.com/full/2667331.jpg"
            alt="cover photo"
            sx={{ borderRadius: 3 }}
          />
          <Grid container spacing={4}>
            <Grid item>
              <Avatar
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
                alt="profile"
                sx={{
                  position: "relative",
                  width: 200,
                  height: 200,
                  top: -50,
                  left: 20,
                }}
              />
            </Grid>
            <Grid item>
              <Typography>Name FamilyName</Typography>
              <Typography>@Username</Typography>
              <AvatarGroup max={4}>
                <Avatar
                  src="https://i.pinimg.com/originals/a7/d2/e6/a7d2e62776ce45b76a88ae2eeaf44803.jpg"
                  alt="p1"
                />
                <Avatar
                  src="https://i.pinimg.com/474x/cb/33/d8/cb33d80fe655e221ae05f41c8edd0cdb.jpg"
                  alt="p2"
                />
                <Avatar
                  src="https://i.pinimg.com/474x/ee/e6/51/eee651694ba2b3112ffb3eb4525547e9--denzel-washington-cinema.jpg"
                  alt="p3"
                />
                <Avatar
                  src="https://i.pinimg.com/originals/9d/13/b0/9d13b0ef9e1a3bce90c3946842a8592f.jpg"
                  alt="p4"
                />
                <Avatar
                  src="https://i.pinimg.com/736x/65/8e/4e/658e4eef6027fe5cfbd580b21d10fc1e--male-portraits-photography-portraits.jpg"
                  alt="p5"
                />
              </AvatarGroup>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default Header;
