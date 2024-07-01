import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = function () {
  const user = useSelector((state) => state.user);

  return user && user.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};
export default AdminRoutes;
