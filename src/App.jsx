import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path={"/posts/:postId/:imgIndex"} element={<PostPage />} />
    </Routes>
  );
}

export default App;
