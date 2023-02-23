import { CssBaseline } from "@mui/material";
import ProfilePage from "./pages/ProfilePage";
import { Navigate, Route, Routes } from "react-router-dom";
import About from "./components/About";
import ProfileHome from "./components/ProfileHome";
import ManageFriends from "./components/ManageFriends";
import Interest from "./components/Interest";
import Details from "./components/Details";
import FriendsList from "./components/FriendsList";
import FriendRequestList from "./components/FriendRequestList";

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Navigate to="/profile" />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route path="/profile" element={<ProfileHome />} />
          <Route element={<About />}>
            <Route path="/profile/about" element={<Details />} />
            <Route path="/profile/interest" element={<Interest />} />
          </Route>
          <Route element={<ManageFriends />}>
            <Route path="/profile/friends" element={<FriendsList />} />
            <Route
              path="/profile/friend-request"
              element={<FriendRequestList />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
