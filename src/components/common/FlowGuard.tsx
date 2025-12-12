import React from "react";
import { Navigate } from "react-router";

interface FlowGuardProps {
  condition: boolean;
  redirectTo: string;
  children: React.ReactNode;
}

const FlowGuard = (props: FlowGuardProps) => {
  const { condition, redirectTo, children } = props;

  if (!condition) return <Navigate to={redirectTo} replace />;

  return <>{children}</>;
};

export default FlowGuard;
