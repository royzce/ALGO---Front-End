import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  Avatar,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Autocomplete,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import * as searchService from "../services/search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function PrimarySearchAppBar() {
  return (
    <AppBar
      position="static"
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <Grid container maxWidth={"xl"} sx={{ mx: "auto" }}>
        <Grid item sm={4}>
          <Toolbar>
            <Typography variant="h6">ALGO</Typography>
          </Toolbar>
        </Grid>
        <Grid item sm={4}>
          <Toolbar>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <AutocompleteWithAvatar />
            </Search>
          </Toolbar>
        </Grid>
        <Grid item sm={4} container justifyContent="flex-end">
          <Toolbar>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="U" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Toolbar>
        </Grid>
      </Grid>
    </AppBar>
  );
}

function CustomOption({ option }) {
  return (
    <div
      style={{ display: "flex", alignItems: "center" }}
      onClick={() => console.log(option)}
    >
      <SearchIcon />
      <Avatar src={option.avatar} />
      <div style={{ marginLeft: "1rem", color: "black" }}>
        {option.firstName + " " + option.lastName}
      </div>
    </div>
  );
}

function NoOption({ value }) {
  return (
    <div
      style={{ display: "flex", alignItems: "center" }}
      onClick={() => console.log("no option")}
    >
      <SearchIcon />
      <div style={{ marginLeft: "1rem", color: "black" }}>{value}</div>
    </div>
  );
}
function AutocompleteWithAvatar() {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  function handleInputChange(event, value) {
    setInputValue(value);
    if (value.length >= 3) {
      searchService.getUsersBy(value).then((res) => setOptions(res.data));
    }
  }

  return (
    <Autocomplete
      options={options}
      // noOptionsText={"Your Customized No Options Text"}
      noOptionsText={<NoOption value={inputValue} />}
      getOptionLabel={(option) => option.firstName + " " + option.lastName}
      renderOption={(props, option) => (
        <CustomOption key={option.id} option={option} />
      )}
      renderInput={(params) => (
        <TextField
          style={{ width: "25rem" }}
          {...params}
          // placeholder="Search Algo"
          variant="outlined"
        />
      )}
      onInputChange={handleInputChange}
    />
  );
}
const suggestions = [
  {
    id: 1,
    other: "1",
    label: "John",
    avatar:
      "https://www.nicepng.com/png/detail/186-1866063_dicks-out-for-harambe-sample-avatar.png",
  },
  {
    id: 2,
    other: "2",
    label: "Jane",
    avatar:
      "https://www.nicepng.com/png/detail/186-1866063_dicks-out-for-harambe-sample-avatar.png",
  },
];
