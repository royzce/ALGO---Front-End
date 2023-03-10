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
  ListItem,
  ListItemAvatar,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import NotificationPanel from "./NotificationPanel";
import { NotifContext } from "../context/NotifContext";
import { UserContext } from "../context/UserContext";
import ColorTheme from "../components/ColorTheme";
import * as userService from "../services/user";
import { DarkModeContext } from "../context/DarkModeContext";
import { useTheme } from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { getElapsedTime } from "../services/util";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isNotifVisible, setNotifListVisible] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [isDefault, setDefaultButtons] = React.useState("default");
  const { setCurrentUser } = useContext(UserContext);
  const { onMarkAsRead, onMarkAllAsRead } = useContext(NotifContext);

  const handleNavbar = () => {
    setDefaultButtons(isDefault === "default" ? "search" : "default");
    navigate("/");
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
    if (isNotifVisible) handleNotifListToggle();
  };
  const handleNotifListToggle = () => {
    setNotifListVisible(!isNotifVisible);
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
    // handleDrawerToggle();
  };

  const navigate = useNavigate();
  const handleGoToProfile = () => {
    handleMdClose();
    navigate(`/${user.username}`);
  };

  const { notifs } = useContext(NotifContext);
  const [notifAnchorEl, setNotifAnchorEl] = React.useState(null);
  const isNotifOpen = Boolean(notifAnchorEl);

  function handleDrawerNotifClick(notif) {
    const { notifId, type, typeId } = notif;
    if (type === "requestFriend") {
      handleDrawerToggle();
      navigate(`/${user.username}/friend-request`);
    } else {
      handleDrawerToggle();
      navigate(`/posts/${typeId}`);
    }
    onMarkAsRead(notifId);
  }

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

  const handleHome = () => {
    navigate("/");
    handleDrawerToggle();
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
        <MenuItem onClick={() => handleGoToProfile()}>
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

  const isXsOrSm = useMediaQuery(theme.breakpoints.down("md"));
  const isMdScreen = useMediaQuery(theme.breakpoints.only("md"));

  return (
    <>
      <AppBar
        position="static"
        color="primary"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Grid
          container
          maxWidth={"xl"}
          sx={{
            mx: "auto",
            display: isXsOrSm ? "flex" : "none",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{ display: isDefault === "default" ? "none" : "flex" }}
          >
            <Toolbar sx={{ width: "100%" }}>
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
                onClick={handleNavbar}
              >
                <ArrowBackIcon />
              </IconButton>
              <AutocompleteWithAvatar darkMode={darkMode} />
            </Toolbar>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{ display: isDefault === "search" ? "none" : "flex" }}
          >
            <Toolbar>
              <Typography
                id="logoName"
                variant="h4"
                color={ColorTheme.palette.textLight.main}
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                algo
              </Typography>
            </Toolbar>
          </Grid>
          <Grid
            item
            xs={8}
            sx={{ display: isDefault === "search" ? "none" : "flex" }}
          ></Grid>
          <Grid
            item
            xs={2}
            container
            justifyContent="flex-end"
            sx={{ display: isDefault === "search" ? "none" : "flex" }}
          >
            <Toolbar>
              <IconButton
                onClick={() => {
                  navigate(`/search/all/blank`);
                  handleNavbar();
                }}
                sx={{
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "#65676B"
                      : theme.palette.secondary.main,
                  display: {
                    xs: "inline-flex",
                    md: "none",
                  },
                }}
              >
                <Avatar sx={{ width: 24, height: 24, bgcolor: "transparent" }}>
                  <SearchIcon color="white" />
                </Avatar>
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  ml: 1,
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "#65676B"
                      : theme.palette.secondary.main,
                }}
              >
                <Avatar sx={{ width: 24, height: 24, bgcolor: "transparent" }}>
                  <MenuIcon color="white" />
                </Avatar>
              </IconButton>
            </Toolbar>
          </Grid>
        </Grid>
        <Grid
          container
          maxWidth={"xl"}
          sx={{
            mx: "auto",
            display: isXsOrSm ? "none" : "flex",
          }}
        >
          <Grid item xs={2}>
            <Toolbar>
              <Typography
                id="logoName"
                variant="h4"
                color={ColorTheme.palette.textLight.main}
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                algo
              </Typography>
            </Toolbar>
          </Grid>
          <Grid item xs={8}>
            <Toolbar>
              <AutocompleteWithAvatar darkMode={darkMode} />
            </Toolbar>
          </Grid>
          <Grid item xs={2} container justifyContent="flex-end">
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
            width: { xs: 300, sm: 400 },
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <List>
            <ListItemButton
              onClick={() => {
                handleDrawerToggle();
                handleGoToProfile();
              }}
            >
              <ListItemIcon>
                <Avatar src={user && user.avatar} alt={user && user.username} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1" fontWeight="fontWeightBold">
                    My Profile
                  </Typography>
                }
              />
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={handleHome}>
              <ListItemIcon>
                <Avatar
                  sx={{
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "default"
                        : theme.palette.secondary.main,
                  }}
                >
                  <HomeIcon color="white" />
                </Avatar>
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            <Divider />
            <ListItemButton onClick={handleNotifListToggle}>
              <ListItemIcon>
                {/* <IconButton onClick={handleNotifClick}> */}
                <Badge
                  badgeContent={
                    notifs && notifs.filter((notif) => !notif.isRead).length
                  }
                  color="error"
                >
                  <Avatar
                    sx={{
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "default"
                          : theme.palette.secondary.main,
                    }}
                  >
                    <NotificationsIcon color="white" />
                  </Avatar>
                </Badge>
                {/* </IconButton> */}
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItemButton>
            <ListItem
              disableGutters
              disablePadding
              sx={{
                overflowY: "auto",
                display: isNotifVisible ? "flex" : "none",
              }}
            >
              <List
                sx={{
                  maxHeight: "350px",
                  width: "100%",
                }}
                dense={true}
              >
                {tabIndex === 0 && (
                  <NotifList notifs={notifs} onClick={handleDrawerNotifClick} />
                )}
                {tabIndex === 1 && (
                  <NotifList
                    notifs={notifs && notifs.filter((notif) => !notif.isRead)}
                    onClick={handleDrawerNotifClick}
                  />
                )}
              </List>
            </ListItem>
            <Divider />
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <List>
              <Divider />
              <ListItemButton onClick={onToggleDarkmode}>
                <ListItemIcon>
                  {darkMode ? (
                    <Avatar>
                      <DarkModeIcon />
                    </Avatar>
                  ) : (
                    <Avatar>
                      <Brightness7Icon />
                    </Avatar>
                  )}
                </ListItemIcon>
                <ListItemText primary={darkMode ? "Dark Mode" : "Light Mode"} />
              </ListItemButton>
              <Divider />
              <ListItemButton
                onClick={() => {
                  handleDrawerToggle();
                  handleLogout();
                }}
              >
                <ListItemIcon>
                  <Avatar
                    sx={{
                      bgcolor: "red",
                    }}
                  >
                    <span className="fa-solid fa-right-from-bracket text-white" />
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

function NotifList({ notifs, onClick }) {
  function displayNotifText(notif) {
    const { from, type, count } = notif;
    let end = "";
    switch (type) {
      case "reaction":
        end = "reacted to your post";
        break;
      case "comments":
        end = "commented on your post";
        break;
      case "tag":
        end = "tagged you in a post";
        break;
      case "share":
        end = "shared your post";
        break;
      case "requestFriend":
        end = "sent you a friend request";
        break;
      default:
        break;
    }

    return (
      <>
        <Typography variant="inherit" component="span">
          <strong>
            {from.firstName} {from.lastName}
          </strong>
          {count < 2 ? (
            ""
          ) : (
            <span>
              {" "}
              and{" "}
              <strong>
                {count - 1} {count - 1 === 1 ? `other` : `others`}
              </strong>{" "}
            </span>
          )}{" "}
          {end}.
        </Typography>
      </>
    );
  }

  function displayDate(date) {
    const display = new Date(date);
    return getElapsedTime(display);
  }

  function displayBadge(type) {
    let icon = <></>;
    switch (type) {
      case "reaction":
        icon = (
          <i
            className="fa-solid fa-fire text-white"
            style={{ fontSize: "10px" }}
          />
        );
        break;
      case "comments":
        icon = (
          <i
            className="fa-solid fa-comment text-white"
            style={{ fontSize: "10px" }}
          />
        );
        break;
      case "tag":
        icon = <i className="fa-solid fa-user-tag text-white" />;
        break;
      case "share":
        icon = (
          <i
            className="fa-solid fa-share text-white"
            style={{ fontSize: "10px" }}
          />
        );
        break;
      case "requestFriend":
        icon = (
          <i
            className="fa-solid fa-user-plus text-white"
            style={{ fontSize: "10px" }}
          />
        );
        break;
      default:
        break;
    }
    return icon;
  }
  function badgeColor(type) {
    let color = null;
    switch (type) {
      case "reaction":
        color = ColorTheme.palette.error.main;
        break;
      case "comments":
        color = ColorTheme.palette.success.main;
        break;
      case "tag":
        color = ColorTheme.palette.primary.main;
        break;
      case "share":
        color = ColorTheme.palette.success.main;
        break;
      case "requestFriend":
        color = ColorTheme.palette.primary.main;
        break;
      default:
        break;
    }
    return color;
  }

  return notifs && notifs.length > 0 ? (
    notifs.map((notif) => (
      <ListItemButton
        key={notif.notifId}
        onClick={() => onClick(notif)}
        selected={!notif.isRead}
      >
        <ListItemAvatar>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Avatar
                sx={{ bgcolor: badgeColor(notif.type), width: 20, height: 20 }}
              >
                {displayBadge(notif.type)}
              </Avatar>
            }
            // color={badgeColor(notif.type)}
          >
            <Avatar alt="avatar" src={notif.from.avatar} />
          </Badge>
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="body2">{displayNotifText(notif)}</Typography>
          }
          secondary={
            <Typography variant="caption">{displayDate(notif.date)}</Typography>
          }
        />
      </ListItemButton>
    ))
  ) : (
    <Typography variant="subtitle2" sx={{ padding: "20px", width: "450px" }}>
      No new notifications
    </Typography>
  );
}

function CustomOption({ option, closeShowOptions, darkMode }) {
  const navigate = useNavigate();
  useEffect(() => {}, [darkMode]);
  return (
    <MenuItem
      style={{
        display: "flex",
        alignItems: "center",
        height: "3.25rem",
      }}
      onClick={() => {
        {
          closeShowOptions();
          navigate("/" + option.username);
        }
      }}
    >
      <Avatar src={option.avatar} />
      <div style={{ marginLeft: "12px", color: darkMode ? "white" : "black" }}>
        {option.firstName + " " + option.lastName}
      </div>
    </MenuItem>
  );
}

//This will show at the bottom always
function NoOption({ value, closeShowOptions, darkMode }) {
  const navigate = useNavigate();
  useEffect(() => {}, [darkMode]);
  return (
    <MenuItem
      style={{
        display: "flex",
        alignItems: "center",
        height: "3.25rem",
      }}
      onClick={() => {
        closeShowOptions();
        navigate(`/search/all/${value}`);
      }}
    >
      <Avatar sx={{ bgcolor: "#1976d2" }}>
        <SearchIcon />
      </Avatar>
      <div style={{ marginLeft: "12px", color: darkMode ? "white" : "black" }}>
        Search for <strong>{value}</strong>
      </div>
    </MenuItem>
  );
}
function AutocompleteWithAvatar({ darkMode }) {
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

  function closeShowOptions() {
    setShowOptions(false);
    document.getElementsByClassName("searchBar")[0].blur();
  }

  return (
    <Autocomplete
      className="searchBar"
      sx={{
        width: "100%",
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
          return (
            <CustomOption
              {...props}
              option={option}
              closeShowOptions={closeShowOptions}
              darkMode={darkMode}
            />
          );
        } else {
          return (
            <NoOption
              {...props}
              value={inputValue}
              closeShowOptions={closeShowOptions}
              darkMode={darkMode}
            />
          );
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
