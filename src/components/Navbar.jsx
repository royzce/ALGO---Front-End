import React, { createRef, useContext, useEffect, useState } from "react";
import {
  Avatar,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Autocomplete,
  TextField,
  Button,
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
  InputAdornment,
  Switch,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { Logout, Settings } from "@mui/icons-material";
import NotificationPanel from "./NotificationPanel";
import { NotifContext } from "../context/NotifContext";
import { UserContext } from "../context/UserContext";
import ColorTheme from "../components/ColorTheme";
import { AuthContext } from "../context/AuthContext";
import * as userService from "../services/user";
import { DarkModeContext } from "../context/DarkModeContext";
import { useTheme } from "@mui/material/styles";
import { bgcolor } from "@mui/system";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { setCurrentUser } = useContext(UserContext);
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const { currentUser: user } = useContext(UserContext);
  const [mdAnchorEl, setMdAnchorEl] = React.useState(null);
  const [drawerAnchorEl, setDrawerProfileAnchorEl] = React.useState(null);
  const mdOpen = Boolean(mdAnchorEl);
  const drawerOpen = Boolean(drawerAnchorEl);
  const { darkMode, onToggleDarkmode } = useContext(DarkModeContext);

  const handleMdClick = (event) => {
    setMdAnchorEl(event.currentTarget);
  };
  const handleMdClose = () => {
    setMdAnchorEl(null);
  };
  const handleDrawerProfileClick = (event) => {
    setDrawerProfileAnchorEl(event.currentTarget);
  };
  const handleDrawerProfileClose = () => {
    setDrawerProfileAnchorEl(null);
    handleDrawerToggle();
  };

  const navigate = useNavigate();
  const handleGoToProfile = () => {
    handleMdClose();
    // handleDrawerProfileClose();
    navigate(`/${user.username}`);
  };

  const { notifs } = useContext(NotifContext);
  const [notifAnchorEl, setNotifAnchorEl] = React.useState(null);
  const isNotifOpen = Boolean(notifAnchorEl);

  const handleNotifClick = (event) => {
    if (notifAnchorEl) {
      setNotifAnchorEl(null);
    } else {
      setNotifAnchorEl(event.currentTarget);
    }
  };

  const handleNotifClose = () => {
    setNotifAnchorEl(null);
  };

  const handleLogout = () => {
    handleMdClose();
    localStorage.removeItem("accessToken");
    setCurrentUser(null);
  };

  const theme = useTheme();

  function ProfileMenu() {
    return (
      <Menu
        anchorEl={mdAnchorEl}
        id="md-menu"
        open={mdOpen}
        onClose={handleMdClose}
        // onClick={handleMdClose}
        PaperProps={{
          sx: {
            overflow: "visible",
            borderRadius: "10px",
            mt: "8px",
            width: "200px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: "2px",
              mr: "22px",
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 15,
              width: 10,
              height: 10,
              bgcolor: theme.palette.mode === "dark" ? "#2F2F2F" : "#FFFFFF",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleGoToProfile}>
          <Avatar src={user && user.avatar} alt={user && user.username} /> My
          Profile
        </MenuItem>
        <div>
          <Switch
            sx={{ mr: "8px", ml: "5px" }}
            onChange={onToggleDarkmode}
            checked={darkMode}
          />
          {darkMode ? "Dark Mode" : "Light Mode"}
        </div>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon sx={{ mr: "10px", ml: "10px" }}>
            <i
              className="fa-solid fa-right-from-bracket"
              style={{ color: ColorTheme.palette.error.main }}
            />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    );
  }

  function DrawerProfileMenu() {
    return (
      <Menu
        anchorEl={drawerAnchorEl}
        id="drawer-menu"
        open={drawerOpen}
        onClose={handleDrawerProfileClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            borderRadius: "10px",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            width: "200px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: "2px",
              mr: "22px",
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              bottom: -10,
              left: 10,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
      >
        <MenuItem onClick={(handleGoToProfile, handleDrawerProfileClose)}>
          <Avatar src={user && user.avatar} alt={user && user.username} /> My
          Profile
        </MenuItem>
        <div>
          <Switch
            sx={{ mr: "8px", ml: "5px" }}
            onChange={onToggleDarkmode}
            checked={darkMode}
          />
          {darkMode ? "Dark Mode" : "Light Mode"}
        </div>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon sx={{ mr: "10px", ml: "10px" }}>
            <i
              className="fa-solid fa-right-from-bracket"
              style={{ color: ColorTheme.palette.error.main }}
            />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    );
  }

  function NotificationsMenu() {
    const navigate = useNavigate();
    return (
      <Menu
        anchorEl={notifAnchorEl}
        open={isNotifOpen}
        onClose={handleNotifClose}
        PaperProps={{
          sx: {
            overflow: "visible",
            borderRadius: "10px",
            mt: "8px",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 15,
              width: 10,
              height: 10,
              bgcolor: theme.palette.mode === "dark" ? "#2F2F2F" : "#FFFFFF",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <NotificationPanel notifs={notifs} onClose={handleNotifClose} />
      </Menu>
    );
  }

  return (
    <>
      <AppBar
        position="static"
        color="primary"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Grid container maxWidth={"xl"} sx={{ mx: "auto" }}>
          <Grid item sm={3}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "inline-flex", md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                id="logoName"
                variant="h4"
                color={ColorTheme.palette.textLight.main}
                sx={{
                  display: {
                    xs: "none",
                    md: "inline-flex",
                  },
                }}
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                algo
              </Typography>
            </Toolbar>
          </Grid>
          <Grid item sm={6}>
            <Toolbar>
              <AutocompleteWithAvatar />
            </Toolbar>
          </Grid>
          <Grid item sm={3} container justifyContent="flex-end">
            <Toolbar>
              <IconButton
                size="middle"
                color="inherit"
                sx={{
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "#65676B"
                      : theme.palette.secondary.main,
                  mx: "5px",
                }}
                onClick={() => navigate("/")}
              >
                <HomeIcon />
              </IconButton>
              <IconButton
                size="middle"
                color="inherit"
                sx={{
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "#65676B"
                      : theme.palette.secondary.main,
                  mx: "5px",
                }}
                onClick={handleNotifClick}
              >
                <Badge
                  badgeContent={
                    notifs && notifs.filter((notif) => !notif.isRead).length
                  }
                  color="error"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              {/**NOTIFICATIONS PANEL */}
              <NotificationsMenu />
              <IconButton
                onClick={handleMdClick}
                aria-controls={mdOpen ? "md-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={mdOpen ? "true" : undefined}
                sx={{
                  p: 0,
                  display: { xs: "none", md: "inline-flex" },
                  ml: "5px",
                }}
              >
                <Avatar src={user && user.avatar} alt={user && user.username} />
              </IconButton>
              <ProfileMenu />
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
      <Drawer open={isDrawerOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{
            width: 300,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <List>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="For Show Only" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="For Show Only" />
            </ListItemButton>
          </List>
          <Divider />
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Divider />
            <Button
              onClick={handleDrawerProfileClick}
              aria-controls={drawerOpen ? "drawer-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={drawerOpen ? "true" : undefined}
              sx={{
                p: 1,
                m: 1,
              }}
              startIcon={
                <Avatar src={user && user.avatar} alt={user && user.username} />
              }
            >
              <Typography variant="body2" fontWeight={"fontWeightBold"}>
                {user && user.firstName} {user && user.lastName}
              </Typography>
            </Button>
            <DrawerProfileMenu />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

function CustomOption({ option }) {
  const navigate = useNavigate();
  return (
    <MenuItem
      style={{
        display: "flex",
        alignItems: "center",
        height: "3.25rem",
      }}
      onClick={() => navigate("/" + option.username)}
    >
      <Avatar src={option.avatar} />
      <div style={{ marginLeft: "12px", color: "black" }}>
        {option.firstName + " " + option.lastName}
      </div>
    </MenuItem>
  );
}

//This will show at the bottom always
function NoOption({ value }) {
  const navigate = useNavigate();
  return (
    <MenuItem
      style={{
        display: "flex",
        alignItems: "center",
        height: "3.25rem",
      }}
      onClick={() => navigate(`/search/all/${value}`)}
    >
      <Avatar sx={{ bgcolor: "#1976d2" }}>
        <SearchIcon />
      </Avatar>
      <div style={{ marginLeft: "12px", color: "black" }}>
        Search for <strong>{value}</strong>
      </div>
    </MenuItem>
  );
}
function AutocompleteWithAvatar() {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  let timeoutId;
  function handleInput(event) {
    const value = event.target.value;
    clearTimeout(timeoutId);
    setInputValue(value.trim());
    timeoutId = setTimeout(() => {
      if (value.trim().length >= 3) {
        userService.getUsersBy(value).then((res) => {
          console.log("options are", res.data);
          setOptions(res.data);
        });
      } else {
        setOptions([]);
      }
    }, 500);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && inputValue.length > 0) {
      event.target.blur();
      navigate(`/search/all/${inputValue}`);
    }
  }
  function handleFocus() {
    setShowOptions(true);
  }
  let inpuSearchRef = createRef();
  function handleBlur() {
    setShowOptions(false);
    inpuSearchRef.current.blur();
  }

  return (
    <Autocomplete
      id="searchBar"
      sx={{
        width: "80%",
        margin: "auto",
        borderRadius: "50px",
        border: "1px solid",
      }}
      ref={inpuSearchRef}
      forcePopupIcon={false}
      options={options}
      open={inputValue.length > 0 && showOptions}
      getOptionLabel={(option) => option.firstName + " " + option.lastName}
      renderOption={(props, option) => {
        if (option.username) {
          return <CustomOption {...props} option={option} />;
        } else {
          return <NoOption {...props} value={inputValue} />;
        }
      }}
      renderInput={(params) => (
        <TextField
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input": {
              height: "12px",
              color: "#FFF",
            },
            "& .css-1ea1xhh-MuiInputBase-input-MuiOutlinedInput-input": {
              height: "12px",
              color: "#FFF",
            },
          }}
          {...params}
          placeholder="Search Algo"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start" style={{ color: "#fff" }}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
      ListboxProps={{ style: { maxHeight: "100%" } }}
      filterOptions={(options) => {
        const result = [...options];
        result.push({ label: "Not Found" });
        return result;
      }}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      onFocus={handleFocus}
      onBlur={handleBlur}
      clearOnBlur={false}
    />
  );
}
