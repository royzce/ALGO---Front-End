
import RegisterPage from "./pages/RegisterPage";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <Routes>
      <Route path={"/posts/:postId/:imgIndex"} element={<PostPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
