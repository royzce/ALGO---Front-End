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
import ColorTheme from "./components/ColorTheme";
import GlobalCSS from "./components/GlobalCSS";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [userProfile] = useState(true);
  useEffect(() => {
    setLoggedIn(isLoggedIn);
    console.log("isloggedIn", isLoggedIn);
    console.log("loggedIn", loggedIn);
  }, [isLoggedIn]);

  return (
    <ThemeProvider theme={ColorTheme}>
      <GlobalCSS />
      <CssBaseline />
      {loggedIn ? <Navbar /> : null}
      <Routes>
        <Route
          path="/register"
          element={loggedIn ? <Navigate to="/" /> : <RegisterPage />}
        />
        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/forgot-password"
          element={loggedIn ? <Navigate to="/" /> : <ForgotPasswordPage />}
        />
        <Route
          path="/reset-password/:token"
          element={loggedIn ? <Navigate to="/" /> : <ResetPasswordPage />}
        />

        <Route
          path="/change-password"
          element={loggedIn ? <ChangePasswordPage /> : <Navigate to="/login" />}
        />
        <Route
          path={"/posts/:postId/:imgIndex"}
          element={loggedIn ? <PostPage /> : <Navigate to="/login" />}
        />
        <Route
          path={"/posts/:postId"}
          element={loggedIn ? <PostPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/profile/:id"
          element={<ProfilePage userProfile={userProfile} />}
        >
          <Route
            index
            element={loggedIn ? <ProfileHome /> : <Navigate to="/login" />}
          />

          <Route element={<ProfileAbout />}>
            <Route path="/profile/:id/about" element={<ProfileDetails />} />
            <Route path="/profile/:id/interest" element={<ProfileInterest />} />
          </Route>
          <Route element={<ManageFriends />}>
            <Route path="/profile/:id/friends" element={<FriendsList />} />
            <Route
              path="/profile/:id/friend-request"
              element={<FriendRequestList />}
            />
          </Route>
        </Route>
        <Route path="/not-found" element={<PageNotFound />} />
        <Route
          path="/search"
          element={loggedIn ? <SearchPage /> : <Navigate to="/login" />}
        >
          <Route path="/search/all/:q" element={<SearchAll />} />
          <Route path="/search/people/:q" element={<SearchPeople />} />
          <Route path="/search/posts/:q" element={<SearchPosts />} />
          <Route path="/search/*" element={<Navigate to="/not-found" />} />
        </Route>
        <Route
          path="/"
          element={loggedIn ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
