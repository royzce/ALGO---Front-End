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
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import * as searchService from "../services/search";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout, Settings } from "@mui/icons-material";
import NotificationPanel from "./NotificationPanel";
import * as userSvc from "../services/user";
import { compareByDate } from "../services/util";
import { NotifContext } from "../context/NotifContext";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { setCurrentUser } = useContext(UserContext);
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

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
    navigate("/profile");
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
    navigate("/login");
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ display: "flex", justifyContent: "center", minWidth: "xs" }}
      >
        <Grid container minWidth={"xs"} maxWidth={"xl"} sx={{ mx: "auto" }}>
          <Grid item sm={4}>
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
                variant="h6"
                sx={{ display: { xs: "none", md: "inline-flex" } }}
              >
                ALGO
              </Typography>
            </Toolbar>
          </Grid>
          <Grid item sm={4}>
            <Toolbar>
              <AutocompleteWithAvatar />
            </Toolbar>
          </Grid>
          <Grid item sm={4} container justifyContent="flex-end">
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
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              {/**NOTIFICATIONS PANEL */}
              <Menu
                anchorEl={notifAnchorEl}
                open={isNotifOpen}
                onClose={handleNotifClose}
                PaperProps={{
                  style: {
                    width: "40%",
                  },
                }}
              >
                <NotificationPanel notifs={notifs} onClose={handleNotifClose} />
              </Menu>
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
                <Avatar alt="U" src="/static/images/avatar/2.jpg" />
              </IconButton>
              <Menu
                anchorEl={mdAnchorEl}
                id="md-menu"
                open={mdOpen}
                onClose={handleMdClose}
                onClick={handleMdClose}
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
                      top: 0,
                      right: 14,
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
                  <Avatar /> My account
                </MenuItem>
                <MenuItem onClick={handleMdClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
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
                <Avatar /> My account
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
  return (
    <MenuItem
      style={{
        display: "flex",
        alignItems: "center",
        height: "3.25rem",
      }}
      onClick={() => console.log(option)}
    >
      <Avatar src={option.avatar} sx={{ marginLeft: "10px" }} />
      <div style={{ marginLeft: "20px", color: "black" }}>
        {option.firstName + " " + option.lastName}
      </div>
    </MenuItem>
  );
}

//This will show at the bottom always
function NoOption({ value }) {
  return (
    <MenuItem
      style={{
        display: "flex",
        alignItems: "center",
        height: "3.25rem",
      }}
      onClick={() => console.log(value)}
    >
      <Avatar sx={{ marginLeft: "10px", bgcolor: "#1976d2" }}>
        <SearchIcon />
      </Avatar>
      <div style={{ marginLeft: "20px", color: "black" }}>
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
        searchService.getUsersBy(value).then((res) => setOptions(res.data));
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
        border: "2px solid #1460ab",
        borderRadius: "50px",
        padding: "0px 5px",
      }}
      PaperComponent={({ children }) => (
        <Paper
          elevation={1}
          style={{
            borderRadius: "8px",
            marginTop: "4px",
            maxHeight: "20rem",
            overflowY: "auto",
          }}
        >
          {children}
        </Paper>
      )}
      ref={inpuSearchRef}
      forcePopupIcon={false}
      options={options}
      open={inputValue.length > 0 && showOptions}
      getOptionLabel={(option) => option.firstName + " " + option.lastName}
      renderOption={(props, option) => {
        if (option.userId) {
          return <CustomOption {...props} option={option} />;
        } else {
          return <NoOption {...props} value={inputValue} />;
        }
      }}
      renderInput={(params) => (
        <TextField
          sx={{
            width: "25rem",
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              backgroundColor: "transparent",
              border: "none",
              overflow: "hidden",
              borderRadius: "50px",
            },
            // "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            //   color: "white",
            // },
            "&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
              {
                backgroundColor: "transparent",
              },
          }}
          {...params}
          placeholder="Search Algo"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
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
