import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";
import { fetchData } from "../DataManagement/DataManager";

export default function AuthInitializer() {
    const { keycloak, initialized } = useKeycloak();

    useEffect(() => {

        if (!initialized) return;

        if (!keycloak.authenticated) return;

        async function syncUser() {
            
            await fetchData("users/sync", "POST", {
                keycloak_id: keycloak.subject,
                username: keycloak.idTokenParsed?.preferred_username || "",
                first_name: keycloak.idTokenParsed?.given_name || "",
                last_name: keycloak.idTokenParsed?.family_name || "",
                email: keycloak.idTokenParsed?.email || "",
            })
        }

        syncUser();

    }, [initialized]);
    
    return null;
}