import { Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import ProtectedRoute from "../components/ProtectedRoute";
import Blog from "../pages/Blog";

function UserRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/blog" element={<Blog />} />

    </Routes>
  );
}

export default UserRoutes;
