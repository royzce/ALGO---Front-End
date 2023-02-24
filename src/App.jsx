import RegisterPage from "./pages/RegisterPage";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Navbar from "./components/Navbar";
import { CssBaseline } from "@mui/material";
import ProfilePage from "./pages/ProfilePage";
import ProfileAbout from "./components/ProfileAbout";
import ProfileHome from "./components/ProfileHome";
import ManageFriends from "./components/ManageFriends";
import ProfileInterest from "./components/ProfileInterest";
import ProfileDetails from "./components/ProfileDetails";
import FriendsList from "./components/FriendsList";
import FriendRequestList from "./components/FriendRequestList";
import EditPrivacy from "./components/EditPrivacy";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path={"/posts/:postId/:imgIndex"} element={<PostPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route path="/profile" element={<ProfileHome />} />
          <Route element={<ProfileAbout />}>
            <Route path="/profile/about" element={<ProfileDetails />} />
            <Route path="/profile/interest" element={<ProfileInterest />} />
          </Route>
          <Route element={<ManageFriends />}>
            <Route path="/profile/friends" element={<FriendsList />} />
            <Route
              path="/profile/friend-request"
              element={<FriendRequestList />}
            />
          </Route>
        </Route>
        <Route path="/not-found" element={<PageNotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:q" element={<SearchPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </>
  );
}

export default App;
