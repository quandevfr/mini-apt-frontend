// Libs
import { useContext } from "react";

// Context
import AuthContext from "@/context/AuthContext";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
