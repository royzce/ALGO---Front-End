import React from "react";
import { Stack, Typography, Button } from "@mui/material";
import appLogo from "../assets/logo.png";
import GlobalCSS from "../components/GlobalCSS";
import { useNavigate } from "react-router";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div style={{ height: "calc(100vh - 64px)" }}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={5}
        height={"100%"}
      >
        <GlobalCSS />
        <Typography variant="h2" fontWeight="fontWeightBold">
          Page not Found
        </Typography>
        <img src={appLogo} height={150} alt="Algo app logo" />
        <Typography variant="body1">
          Sorry, the page you requested could not be found
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ px: 10 }}
          onClick={() => navigate("/")}
        >
          Home
        </Button>
      </Stack>
    </div>
  );
}
