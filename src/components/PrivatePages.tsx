import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

interface PrivatePageProps {
  children?: React.ReactNode;
}

export const PrivatePage: React.FC<PrivatePageProps> = ({
  children,
}: PrivatePageProps) => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    logout();
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <Navigate to="/auth/login" />;
};
