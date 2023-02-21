import React from "react";
import { Stack, Typography, Button } from "@mui/material";
import appLogo from "../assets/logo.png";

export default function PageNotFound() {
  return (
    <div style={{ height: "100vh" }}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        height={"100%"}
      >
        <img src={appLogo} style={{ height: "150px" }} alt="Algo app logo" />
        <Typography variant="h3">
          <strong>Sorry, Page not Found</strong>
        </Typography>
        <Typography variant="body1">
          The page you requested could not be found
        </Typography>
        <Button variant="contained" size="large" sx={{ px: 10 }}>
          Home
        </Button>
      </Stack>
    </div>
  );
}
