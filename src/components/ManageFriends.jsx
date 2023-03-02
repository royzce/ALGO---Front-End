import {
  Card,
  CardHeader,
  InputBase,
  Tab,
  Tabs,
  alpha,
  styled,
  Typography,
  Container,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import { ProfileNavContext } from "../context/ProfileNavContext";

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
  // const { friendsTab, setFriendsTab, setProfileTab } =
  //   useContext(ProfileNavContext);
  const [friendsTab, setFriendsTab] = useState("AllFriends");
  let { username } = useParams();
  const handleChange = (event, newValue) => {
    setFriendsTab(newValue);
  };

  const location = useLocation();

  useEffect(() => {
    handleLocChange();
  }, [location]);

  function handleLocChange() {
    const tab = location.pathname.split("/")[2];
    switch (tab) {
      case "friends":
        setFriendsTab("AllFriends");
        break;
      case "friend-request":
        setFriendsTab("FriendRequest");
        break;
      case "discover-friend":
        setFriendsTab("DiscoverFriends");
        break;
      default:
        break;
    }
  }

  const styles = {
    borderRadius: {
      borderRadius: "10px",
    },
  };
  return (
    <Card sx={styles.borderRadius}>
      <CardHeader
        sx={{ padding: "20px" }}
        title={
          <Typography variant="h5" fontWeight="fontWeightBold">
            Friends
          </Typography>
        }
        action={
          <Search sx={styles.borderRadius}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" />
          </Search>
        }
      >
        Friends
      </CardHeader>
      <Container sx={{ padding: "0 20px 20px 20px" }}>
        <Tabs
          value={friendsTab}
          onChange={handleChange}
          sx={{ marginBottom: "20px" }}
        >
          <Tab
            value="AllFriends"
            label="All Friends"
            LinkComponent={Link}
            to={`/${username}/friends`}
          />
          <Tab
            value="FriendRequest"
            label="Friend Request"
            LinkComponent={Link}
            to={`/${username}/friend-request`}
          />
          <Tab
            value="DiscoverFriends"
            label="Discover Friends"
            LinkComponent={Link}
            to={`/${username}/discover-friend`}
          />
        </Tabs>
        <Outlet />
      </Container>
    </Card>
  );
};

export default ManageFriends;
