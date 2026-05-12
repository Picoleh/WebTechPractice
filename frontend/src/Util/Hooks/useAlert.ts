import { useState } from "react";

export type AlertType = "success" | "error" | "info";

export type AlertState = {
    isOpen: boolean;
    type: AlertType;
    message: string;
    triggerId: number;
};

const initialAlertState: AlertState = {
    isOpen: false,
    type: "success",
    message: "",
    triggerId: 0,
};

export function useAlert() {
    const [alert, setAlert] = useState<AlertState>(initialAlertState);

    function showAlert(message: string, type: AlertType = "success") {
        setAlert((currentAlert) => ({
            isOpen: true,
            type,
            message,
            triggerId: currentAlert.triggerId + 1,
        }));
    }

    function closeAlert() {
        setAlert((currentAlert) => ({
            ...currentAlert,
            isOpen: false,
        }));
    }

    return {
        alert,
        showAlert,
        closeAlert,
    };
}
