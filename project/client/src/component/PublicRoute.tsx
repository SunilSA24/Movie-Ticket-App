import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PublicRoute({children}: {children: ReactNode}) {
  const userData = useSelector((state: any) => state.user?.userData);

  if (userData) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}

export default PublicRoute