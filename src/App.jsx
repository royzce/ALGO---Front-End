import { CssBaseline } from "@mui/material";
import ProfilePage from "./pages/ProfilePage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <ProfilePage />
    // <>
    //   <CssBaseline />
    //   <Routes>
    //     <Route path="/" element={<ProfilePage />}>
    //       <Route path="/about" component={<
    //     </Route>
    //   </Routes>
    // </>
  );
}

export default App;
