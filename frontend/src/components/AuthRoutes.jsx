import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const AuthRoutes = function () {
  const user = useSelector((state) => state.user.name);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoutes;
