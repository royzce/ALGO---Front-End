import {
  Card,
  CardContent,
  CardHeader,
  InputBase,
  Tab,
  Tabs,
  alpha,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link, Outlet } from "react-router-dom";

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

const ManageFriends = () => {
  const [value, setValue] = useState("AllFriends");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Card>
      <CardHeader
        title="Friends"
        action={
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" />
          </Search>
        }
      />
      <CardContent>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            value="AllFriends"
            label="All Friends"
            LinkComponent={Link}
            to={"/profile/friends"}
          />
          <Tab
            value="FriendRequest"
            label="Friend Request"
            LinkComponent={Link}
            to={"/profile/friend-request"}
          />
        </Tabs>
        <Outlet />
      </CardContent>
    </Card>
  );
};

export default ManageFriends;
