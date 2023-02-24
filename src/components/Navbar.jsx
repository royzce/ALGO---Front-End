import React, { createRef, useEffect, useState } from "react";
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
  Button,
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
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

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

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
                <MenuItem onClick={handleMdClose}>
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

//This will show at the bottom always
function NoOption({ value }) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", height: "2.5rem" }}
      onClick={() => console.log(value)}
    >
      <SearchIcon />
      <div style={{ marginLeft: "1rem", color: "black" }}>
        Search for <strong>{value}</strong>
      </div>
    </div>
  );
}
function AutocompleteWithAvatar() {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  // function handleInputChange(event, value) {
  //   setInputValue(value.trim());
  //   if (value.trim().length >= 3) {
  //     const users = algo_users
  //       .filter(
  //         (user) =>
  //           user.firstName.toUpperCase().includes(value.toUpperCase()) ||
  //           user.lastName.toUpperCase().includes(value.toUpperCase())
  //       )
  //       .slice(0, 5); //limit of five result
  //     setOptions(users);
  //   } else {
  //     setOptions([]);
  //   }
  // }
  let timeoutId;
  function handleInput(event) {
    const value = event.target.value;
    clearTimeout(timeoutId);
    setInputValue(value.trim());
    timeoutId = setTimeout(() => {
      if (value.trim().length >= 3) {
        const users = algo_users
          .filter(
            (user) =>
              user.firstName.toUpperCase().includes(value.toUpperCase()) ||
              user.lastName.toUpperCase().includes(value.toUpperCase())
          )
          .slice(0, 5); //limit of five result
        setOptions(users);
      } else {
        setOptions([]);
      }
    }, 500);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && inputValue.length > 0) {
      event.target.blur();
      navigate(`/search/${inputValue}`);
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
  /**
   * Code Below is for implementation in API
   *
   */
  // function handleInputChange(event, value) {
  //   const val = value.trim();
  //   setInputValue(val);
  //   if (val.length >= 3) {
  //     searchService.getUsersBy(value).then((res) => setOptions(res.data));
  //   } else {
  //     setOptions([]);
  //   }
  // }

  return (
    <Autocomplete
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
          style={{ width: "25rem" }}
          {...params}
          placeholder="Search Algo"
          variant="outlined"
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
const algo_users = [
  {
    userId: 1,
    firstName: "Angel",
    lastName: "Balenciaga",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F00DDHV6P6I.jpg?alt=media&token=deb4762a-2323-4af9-8769-78db5cec2c5a",
  },
  {
    userId: 2,
    firstName: "Angelica",
    lastName: "Panganiban",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F00HMODIU9J.jpg?alt=media&token=671744b6-de2f-4138-98b8-164da6077c61",
  },
  {
    userId: 3,
    firstName: "Angel",
    lastName: "Veronica",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F00MGSY49K2.jpg?alt=media&token=a6f4151b-bafe-40d5-b234-4b1571a75fb7",
  },
  {
    userId: 4,
    firstName: "Angelo",
    lastName: "Marquez",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F00O7UYYU9V.jpg?alt=media&token=7a108608-ff5a-4e7f-a433-7bc5f57cdbdd",
  },
  {
    userId: 5,
    firstName: "Angelina",
    lastName: "Jolie",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F00VY5DHI8O.jpg?alt=media&token=69fb5e40-8eab-4ef2-9905-c3bb6b5ea73d",
  },
  {
    userId: 6,
    firstName: "Angeline",
    lastName: "Hermes",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F0A0V7YR2U2.jpg?alt=media&token=34be29e9-86a3-4829-9af6-b2604c260e96",
  },
  {
    userId: 7,
    firstName: "Indra",
    lastName: "Jakowski",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F0A0ZO6FNXA.jpg?alt=media&token=02b2eb2e-9c62-41c3-a001-0438fa7cb157",
  },
  {
    userId: 8,
    firstName: "Trevor",
    lastName: "Phillips",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F0A4NEMTDJ7.jpg?alt=media&token=b5b6a8de-e26b-4b6a-ae59-3e7b2d3365be",
  },
  {
    userId: 9,
    firstName: "Franklin",
    lastName: "Clinton",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F0A5XM62LM4.jpg?alt=media&token=64a4f0ac-a35b-4f42-a2fd-fb7831b442d0",
  },
  {
    userId: 10,
    firstName: "Amanda",
    lastName: "De Santa",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F0A6YFM58N0.jpg?alt=media&token=8ec9ef52-fc15-433e-8c20-0456cbb35b6e",
  },
  {
    userId: 11,
    firstName: "Michael",
    lastName: "De Santa",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F0AGT5F3FNE.jpg?alt=media&token=dba6b6ba-3c37-430f-8dce-ce27a3836504",
  },
  {
    userId: 12,
    firstName: "Jimmy",
    lastName: "De Santa",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F0ANGY2SYN7.jpg?alt=media&token=95c06fcc-adba-4157-b184-8e077ffcda4c",
  },
  {
    userId: 13,
    firstName: "Tracey",
    lastName: "De Santa",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F0B5DZ7MKOY.jpg?alt=media&token=f4790e02-2028-4df7-aea4-6be792d2f22a",
  },
  {
    userId: 14,
    firstName: "Jamal",
    lastName: "De Santa",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F0BRWC7HAC3.jpg?alt=media&token=4a1ada5f-7acc-42f0-9a6e-051798d3fd46",
  },
  {
    userId: 15,
    firstName: "Henry",
    lastName: "De Santa",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F0BTCZW1VBE.jpg?alt=media&token=b1924946-204d-4e02-b03f-98ff740e0af1",
  },
  {
    userId: 16,
    firstName: "Devin",
    lastName: "Weston",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F0BW2N25I0F.jpg?alt=media&token=019bdf79-6270-43fb-8b2d-a15963be49af",
  },
  {
    userId: 17,
    firstName: "Steve",
    lastName: "Haines",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F0BY6WJD0QP.jpg?alt=media&token=f2b6815d-041b-49af-8f88-789b51cff1e2",
  },
  {
    userId: 18,
    firstName: "Lester",
    lastName: "Crest",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F0BZMC0FWO6.jpg?alt=media&token=56424ebb-a450-45dc-b76e-ed8b60ea2184",
  },
  {
    userId: 19,
    firstName: "Issei",
    lastName: "Hyoudou",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F0C1VLKP793.jpg?alt=media&token=5e6cb850-e2c7-4ee8-9248-c2a737c8ef1f",
  },
  {
    userId: 20,
    firstName: "Xiao",
    lastName: "Yan",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F0C23MMTNOA.jpg?alt=media&token=35b6cd5a-4b6a-4363-934a-d898d7bb6923",
  },
  {
    userId: 21,
    firstName: "Xiao",
    lastName: "Medusa",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F0C3LY56PA6.jpg?alt=media&token=bd664475-0a98-41ea-af8b-af21a9a4b4f4",
  },
  {
    userId: 22,
    firstName: "Bradley",
    lastName: "Armstrong",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F0C4OBGIA51.jpg?alt=media&token=c1d4b7b6-0073-4c3f-a0c4-3173ccb5d5ca",
  },
  {
    userId: 23,
    firstName: "James",
    lastName: "Randal",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F0C5H69BYBO.jpg?alt=media&token=e86d8072-a8b2-4910-8452-5a868af63dd8",
  },
  {
    userId: 24,
    firstName: "Kai",
    lastName: "Cenat",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F0C5QOGO8NX.jpg?alt=media&token=c44d49a2-de73-472b-870c-2c7903438573",
  },
  {
    userId: 25,
    firstName: "Felix",
    lastName: "Lengyel",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F0C60BF862Y.jpg?alt=media&token=9bab6fae-34da-43dd-9e5e-7a6b87bcf351",
  },
  {
    userId: 26,
    firstName: "Thomas",
    lastName: "Sykk",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F0C73NDB1SD.jpg?alt=media&token=fddab682-37b0-4f96-9a6f-44ad8ea8c761",
  },
  {
    userId: 27,
    firstName: "Hamoudi",
    lastName: "Yas",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/socialmediadatabase-6e54e.appspot.com/o/temporary%2F0CBJZNFYM8.jpg?alt=media&token=58696c83-db86-4d18-be2a-a88cc9ea3746",
  },
  {
    userId: 28,
    firstName: "Royce Ricco",
    lastName: "Montoya",
    avatar:
      "https://scontent.fcrk3-2.fna.fbcdn.net/v/t39.30808-1/327251337_589904242488095_2902792635232541737_n.jpg?stp=dst-jpg_p320x320&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeHdiwWEwk5DuWbQeD71FzHkIgbHoIYjoVgiBseghiOhWBAA99JkozYHd3WexWSnk_kx0aaRxlh_NpUNGB4O9qef&_nc_ohc=p8nqfDlLcMYAX_IBu_G&_nc_oc=AQlVXL4wHmbXjTCQIW21XwmAp4LbC19eh8KWdZefEq2oL0tz8ug5MHtSOB7s1cDmtkM&tn=zL41KcpXwhZ771gt&_nc_ht=scontent.fcrk3-2.fna&oh=00_AfCis5jrSGyuR2idm7fN20QebhFX0wO-o5wSqc0v-aP85A&oe=63FB798A",
  },
  {
    userId: 29,
    firstName: "Zandor Deogenes",
    lastName: "Ajoc",
    avatar:
      "https://scontent.fcrk3-2.fna.fbcdn.net/v/t39.30808-1/301985284_5866566480034673_6630909279956117949_n.jpg?stp=dst-jpg_s320x320&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeHoJh8MTPNcegq5J-z_KvElCEJgLblrQ3kIQmAtuWtDefjPwh0dH2cD3QWKQbzMBq-jXWeapiKm-LnF6NFK3WM_&_nc_ohc=y_3L4dSXHtAAX-ZPEeJ&_nc_ht=scontent.fcrk3-2.fna&oh=00_AfDpTVDQHlCTINGogrS9HgiuxSDYQFAnx4X-8AXuXgAybg&oe=63FB1823",
  },
  {
    userId: 30,
    firstName: "Mark",
    lastName: "Manzano",
    avatar:
      "https://scontent.fcrk3-1.fna.fbcdn.net/v/t39.30808-1/329981442_1168627087164233_4715785426099017120_n.jpg?stp=dst-jpg_s720x720&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeFU7rVv-1xhZ2YfB6Wqpd_zC0EOAZLDtbALQQ4BksO1sM_Jii8K-6DjSZKiEx9QG09MrwteB-ikcm2hXOKvh2mY&_nc_ohc=FfxHABs4I_QAX-IY9Wa&_nc_ht=scontent.fcrk3-1.fna&oh=00_AfCyxZembEC4UE_8aNcFUmlaRUlrkb4B5QNsvpMesIAz6A&oe=63FC463B",
  },
  {
    userId: 31,
    firstName: "Gomer Canilao",
    lastName: "Carillo",
    avatar:
      "https://scontent.fcrk3-2.fna.fbcdn.net/v/t1.6435-1/78424263_2884071354950699_2067981449708961792_n.jpg?stp=dst-jpg_p720x720&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeEul8SwMIk00q1nNCdvbusKN3GqXwvb4jg3capfC9viOFmIKB474_79DQ0kaQ8oVGOKA6S2dbGWk9Bkdmz184cW&_nc_ohc=89autJyIbj4AX86CcVJ&_nc_ht=scontent.fcrk3-2.fna&oh=00_AfCNinpRSlVgyQBrpdiYkkhgOi3VZLmFjeDHhdhZdRn5ew&oe=641E7C30",
  },
  {
    userId: 32,
    firstName: "Daryl",
    lastName: "Victa",
    avatar:
      "https://scontent.fcrk3-2.fna.fbcdn.net/v/t1.6435-1/74875203_758670001223503_4204130691899719680_n.jpg?stp=dst-jpg_s320x320&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeGm34xWLoiCcnQvIcKas6zunUkz_fok11adSTP9-iTXVkFaVXhp3dyHvi65wvFrQh_F59K1zUKTkiZtdpomCct7&_nc_ohc=DQkw_l3UHmoAX9f2tDI&_nc_ht=scontent.fcrk3-2.fna&oh=00_AfBzDaiaSGUn2VVZadssn5_4USvtLK_z9VtsRrmzRaSWNA&oe=641E8819",
  },
];
