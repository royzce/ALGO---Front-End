import React, { createRef, useContext, useState } from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout, Settings } from "@mui/icons-material";
import NotificationPanel from "./NotificationPanel";
import { NotifContext } from "../context/NotifContext";
import { UserContext } from "../context/UserContext";
import ColorTheme from "../components/ColorTheme";
import { AuthContext } from "../context/AuthContext";
import * as userService from "../services/user";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { setCurrentUser } = useContext(UserContext);
  const { handleLoggedIn } = useContext(AuthContext);
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const { currentUser: user } = useContext(UserContext);
  const [mdAnchorEl, setMdAnchorEl] = React.useState(null);
  const [drawerAnchorEl, setDrawerAnchorEl] = React.useState(null);
  const mdOpen = Boolean(mdAnchorEl);
  const drawerOpen = Boolean(drawerAnchorEl);
  const handleMdClick = (event) => {
    setMdAnchorEl(event.currentTarget);
  };
  const handleMdClose = () => {
    setMdAnchorEl(null);
  };
  const handleDrawerClick = (event) => {
    setDrawerAnchorEl(event.currentTarget);
  };
  const handleDrawerClose = () => {
    setDrawerAnchorEl(null);
  };

  const navigate = useNavigate();
  const handleGoToProfile = () => {
    handleMdClose();
    handleDrawerClose();
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

  function ProfileMenu() {
    return (
      <Menu
        anchorEl={mdAnchorEl}
        id="md-menu"
        open={mdOpen}
        onClose={handleMdClose}
        onClick={handleMdClose}
        PaperProps={{
          sx: {
            overflow: "visible",
            borderRadius: "10px",
            mt: "8px",
            width: "180px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 15,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
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
        <MenuItem onClick={handleMdClose}>
          <ListItemIcon>
            <Settings fontSize="small" color="primary" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" color="primary" />
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
            mt: "-5px",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 27,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
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
                variant="h5"
                fontWeight={"fontWeightBold"}
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
                size="large"
                color="inherit"
                onClick={handleNotifClick}
              >
                <Badge
                  badgeContent={
                    notifs && notifs.filter((notif) => !notif.isRead).length
                  }
                  color="error"
                >
                  <Avatar sx={{ bgcolor: ColorTheme.palette.secondary.main }}>
                    <NotificationsIcon color="textLight" />
                  </Avatar>
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
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItemButton>
          </List>
          <Divider />
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Divider />
            <Button
              onClick={handleDrawerClick}
              aria-controls={drawerOpen ? "drawer-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={drawerOpen ? "true" : undefined}
              sx={{
                p: 1,
                m: 1,
              }}
              startIcon={<Avatar alt="U" src="/static/images/avatar/2.jpg" />}
            >
              <Typography variant="body2" fontWeight={"fontWeightBold"}>
                Name FamilyName
              </Typography>
            </Button>
            <Menu
              anchorEl={drawerAnchorEl}
              id="drawer-menu"
              open={drawerOpen}
              onClose={handleDrawerClose}
              onClick={handleDrawerClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  borderRadius: "10px",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    bottom: -10,
                    left: 14,
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
              <MenuItem onClick={handleGoToProfile}>
                <Avatar /> My Profile
              </MenuItem>
              <MenuItem onClick={handleDrawerClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleDrawerClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
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
      sx={{
        width: "80%",
        margin: "auto",
        borderRadius: "50px",
        backgroundColor: ColorTheme.palette.secondary.main,
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
              color: ColorTheme.palette.textLight.main,
            },
          }}
          {...params}
          placeholder="Search Algo"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="textLight" />
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
