import { useSelector } from "react-redux";
import { Outlet } from "react-bootstrap-icons";
import { Navigate } from "react-router-dom";

const AdminRoutes = function () {
  const user = useSelector((state) => state.user.name);

  return user && user.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};
export default AdminRoutes;
