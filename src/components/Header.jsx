import {
  Avatar,
  AvatarGroup,
  Box,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const Header = () => {
  const styles = {
    profilePhoto: {
      border: "5px solid white",
      width: 200,
      height: 200,
      margin: "-50px 0 0 20px",
    },
    coverPhoto: {
      objectFit: "cover",
      width: "100%",
      height: "400px",
      marginBottom: "10px",
      borderBottomLeftRadius: "12px",
      borderBottomRightRadius: "12px",
    },
    stack1: {
      marginBottom: "20px",
    },
  };
  return (
    <Container disableGutters>
      <CardMedia
        component="img"
        image="https://wallpaperaccess.com/full/22249.jpg"
        sx={styles.coverPhoto}
      />
      <Stack
        direction="row"
        justifyContent="flex-start"
        spacing={3}
        sx={styles.stack1}
      >
        <Avatar
          src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
          alt="profile"
          sx={styles.profilePhoto}
        />
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          spacing={1}
        >
          <Typography variant="h4" fontWeight="fontWeightBold">
            Name FamilyName
          </Typography>
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
        </Stack>
      </Stack>
    </Container>
  );
};

export default Header;
