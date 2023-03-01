import RegisterPage from "./pages/RegisterPage";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import ColorTheme from "./components/ColorTheme";
import GlobalCSS from "./components/GlobalCSS";
import DiscoverFriends from "./components/DiscoverFriends";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const [userProfile] = useState(true);

  return (
    <ThemeProvider theme={ColorTheme}>
      <GlobalCSS />
      <CssBaseline />
      {isLoggedIn ? <Navbar /> : null}
      <Routes>
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" /> : <RegisterPage />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/forgot-password"
          element={isLoggedIn ? <Navigate to="/" /> : <ForgotPasswordPage />}
        />
        <Route
          path="/reset-password/:token"
          element={isLoggedIn ? <Navigate to="/" /> : <ResetPasswordPage />}
        />

        <Route
          path="/change-password"
          element={
            isLoggedIn ? <ChangePasswordPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path={"/posts/:postId/:imgIndex"}
          element={isLoggedIn ? <PostPage /> : <Navigate to="/login" />}
        />
        <Route
          path={"/posts/:postId"}
          element={isLoggedIn ? <PostPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/:username"
          element={<ProfilePage userProfile={userProfile} />}
        >
          <Route
            index
            element={isLoggedIn ? <ProfileHome /> : <Navigate to="/login" />}
          />

          <Route element={<ProfileAbout />}>
            <Route path="/:username/about" element={<ProfileDetails />} />
            <Route path="/:username/interest" element={<ProfileInterest />} />
          </Route>
          <Route element={<ManageFriends />}>
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
        </Route>
        <Route path="/not-found" element={<PageNotFound />} />
        <Route
          path="/search"
          element={isLoggedIn ? <SearchPage /> : <Navigate to="/login" />}
        >
          <Route path="/search/all/:q" element={<SearchAll />} />
          <Route path="/search/people/:q" element={<SearchPeople />} />
          <Route path="/search/posts/:q" element={<SearchPosts />} />
          <Route path="/search/*" element={<Navigate to="/not-found" />} />
        </Route>
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
