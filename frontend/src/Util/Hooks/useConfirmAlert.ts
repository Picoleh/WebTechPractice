import { useState } from "react";

type ConfirmCallback = (result: boolean) => void;

export function useConfirmAlert() {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [triggerId, setTriggerId] = useState(0);
    const [confirmCallback, setConfirmCallback] = useState<ConfirmCallback | null>(null);

    function openConfirm(message: string): Promise<boolean> {
        return new Promise((resolve) => {
            setConfirmMessage(message);
            setTriggerId((prev) => prev + 1);
            setConfirmCallback(() => (result: boolean) => {
                resolve(result);
                setIsConfirmOpen(false);
            });
            setIsConfirmOpen(true);
        });
    }

    function handleConfirmResult(result: boolean) {
        if (confirmCallback) {
            confirmCallback(result);
        }
    }

    return {
        isConfirmOpen,
        confirmMessage,
        triggerId,
        openConfirm,
        handleConfirmResult,
    };
}
