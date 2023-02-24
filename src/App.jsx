import RegisterPage from "./pages/RegisterPage";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

import Navbar from "./components/Navbar";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/posts/:postId/:imgIndex"} element={<PostPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/not-found" element={<PageNotFound />} />
        <Route path="/search/:q" element={<SearchPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </>
  );
}

export default App;
