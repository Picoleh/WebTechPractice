import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={{
        onLoad: "check-sso",
        pkceMethod: "S256",
      }}>
      {children}
    </ReactKeycloakProvider>
  );
}