import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const selectAuth = (state: any) => state.user;
  const { currentUser } = useSelector(selectAuth);
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
