import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


function ProtectedRoute({ children }: { children: ReactNode }) {
  const userData = useSelector((state: any) => state.user?.userData);

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute