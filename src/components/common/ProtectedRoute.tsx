// Libs
import { Navigate, Outlet } from "react-router";

// Interface, Type
import type { IUser } from "@/utils/interface";

interface Props {
  allowedRoles?: string[];
}

const ProtectedRoute = (props: Props) => {
  const { allowedRoles } = props;
  // todo: get accessToken, user từ redux store
  const user: IUser = {
    email: "example@gmail.com",
    username: "example",
    role: ["admin"],
  }; // mock data

  const isAllowed = user?.role?.find((r) => allowedRoles?.includes(r));

  return isAllowed ? (
    <Outlet />
  ) : user ? (
    <Navigate to={"/unauthorized"} replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
