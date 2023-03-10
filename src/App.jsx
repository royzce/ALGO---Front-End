import RegisterPage from "./pages/RegisterPage";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Navbar from "./components/Navbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ProfilePage from "./pages/ProfilePage";
import ProfileAbout from "./components/ProfileAbout";
import ProfileHome from "./components/ProfileHome";
import ManageFriends from "./components/ManageFriends";
import ProfileInterest from "./components/ProfileInterest";
import ProfileDetails from "./components/ProfileDetails";
import FriendsList from "./components/FriendsList";
import FriendRequestList from "./components/FriendRequestList";
import SearchPage from "./pages/SearchPage";
import SearchAll from "./components/SearchAll";
import SearchPeople from "./components/SearchPeople";
import SearchPosts from "./components/SearchPosts";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import GlobalCSS from "./components/GlobalCSS";
import DiscoverFriends from "./components/DiscoverFriends";
import { UserContext } from "./context/UserContext";
import PhotosPage from "./components/PhotosPage";
import EditProfilePage from "./pages/EditProfilePage";
import { createTheme } from "@mui/material/styles";
import { DarkModeContext } from "./context/DarkModeContext";
function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const { currentUser } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const isAuthorized = isAuthenticated();
  const { darkMode } = useContext(DarkModeContext);

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#7286D3",
      },
      secondary: {
        main: "#8EA7E9",
      },
      body: {
        main: "#FFF2F2",
      },
      white: {
        main: "#FFF",
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#90caf9",
      },
      secondary: {
        main: "#8EA7E9",
      },
      white: {
        main: "#FFF",
      },
    },
  });

  useEffect(() => {
    if (currentUser) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [currentUser]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalCSS />
      <CssBaseline />
      {isAuthorized ? <Navbar /> : null}
      <Routes>
        <Route
          path="/register"
          element={isAuthorized ? <Navigate to="/" /> : <RegisterPage />}
        />
        <Route
          path="/login"
          element={isAuthorized ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/forgot-password"
          element={isAuthorized ? <Navigate to="/" /> : <ForgotPasswordPage />}
        />
        <Route
          path="/reset-password/:token"
          element={isAuthorized ? <Navigate to="/" /> : <ResetPasswordPage />}
        />

        <Route
          path="/change-password"
          element={
            isAuthorized ? <ChangePasswordPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path={"/posts/:postId/:imgIndex"}
          element={isAuthorized ? <PostPage /> : <Navigate to="/login" />}
        />
        <Route
          path={"/posts/:postId"}
          element={isAuthorized ? <PostPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/:username"
          element={
            isAuthorized ? (
              <ProfilePage userProfile={userProfile} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route
            index
            element={isAuthorized ? <ProfileHome /> : <Navigate to="/login" />}
          />

          <Route
            element={isAuthorized ? <ProfileAbout /> : <Navigate to="/login" />}
          >
            <Route path="/:username/about" element={<ProfileDetails />} />
            <Route path="/:username/interest" element={<ProfileInterest />} />
          </Route>
          <Route path="/:username/photos" element={<PhotosPage />} />
          <Route
            element={
              isAuthorized ? <ManageFriends /> : <Navigate to="/login" />
            }
          >
            <Route path="/:username/friends" element={<FriendsList />} />
            <Route
              path="/:username/friend-request"
              element={<FriendRequestList />}
            />
            <Route
              path="/:username/discover-friend"
              element={<DiscoverFriends />}
            />
          </Route>
          <Route path="/:username/edit" element={<EditProfilePage />} />
        </Route>
        <Route path="/not-found" element={<PageNotFound />} />
        <Route
          path="/search"
          element={isAuthorized ? <SearchPage /> : <Navigate to="/login" />}
        >
          <Route path="/search/all/:q" element={<SearchAll />} />
          <Route path="/search/people/:q" element={<SearchPeople />} />
          <Route path="/search/posts/:q" element={<SearchPosts />} />
          <Route path="/search/*" element={<Navigate to="/not-found" />} />
        </Route>
        <Route
          path="/"
          element={isAuthorized ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
