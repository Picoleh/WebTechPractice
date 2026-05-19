import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { keycloak, initialized} = useKeycloak();
    const navigate = useNavigate();

    useEffect(() => {
        if (!initialized) return;

        if (keycloak.authenticated) {
            navigate("/");
            return;
        }

        keycloak.login();

    }, [initialized]);

    return(
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Redirecting to login...</h1>
            {!initialized && <p>Loading Keycloak...</p>}
            {initialized && !keycloak.authenticated && <p>Redirecting to Keycloak login page...</p>}
        </div>
    );
}