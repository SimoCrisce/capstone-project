import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const GuestRoutes = () => {
  const user = useSelector((state) => state.user.name);

  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default GuestRoutes;
