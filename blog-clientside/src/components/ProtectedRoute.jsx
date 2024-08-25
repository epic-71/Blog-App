import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute() {
  const isAuthenticated = useSelector((state) => state.user.user);

  return <div>{isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />}</div>;
}

export default ProtectedRoute;
