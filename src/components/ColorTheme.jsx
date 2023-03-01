import { createTheme } from "@mui/material";

const ColorTheme = createTheme({
  // your custom theme configuration here
  palette: {
    primary: {
      main: "#7286D3",
    },
    secondary: {
      main: "#8EA7E9",
    },
    darkPrimary: {
      main: "#242526",
    },
    darkSecondary: {
      main: "#8EA7E9",
    },
    success: {
      main: "#388e3c",
    },
    error: {
      main: "#d32f2f",
    },
    textLight: {
      main: "#FFFFFF",
    },
    textDark: {
      main: "#242526",
    },
    body: {
      main: "#eef2f6",
    },
  },
});

export default ColorTheme;
