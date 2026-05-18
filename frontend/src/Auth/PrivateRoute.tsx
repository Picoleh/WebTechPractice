import { Navigate, Outlet } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

export default function PrivateRoute() {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return keycloak.authenticated
    ? <Outlet />
    : <Navigate to="/login" />;
}