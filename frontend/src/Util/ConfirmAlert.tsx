import { useEffect, useRef, useState } from "react";
import { CiCircleQuestion } from "react-icons/ci";

type ConfirmAlertProps = {
  message: string;
  isOpen: boolean;
  triggerId: number;
  onConfirm: (result: boolean) => void;
};

export default function ConfirmAlert({ message, isOpen, triggerId, onConfirm }: ConfirmAlertProps) {
    const [isVisible, setIsVisible] = useState(isOpen);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    function clearTimer() {
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
    }

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        }
        else {
            closeAlert();
        }

        return clearTimer;
    }, [isOpen, triggerId]);

    function closeAlert() {
        clearTimer();
        setIsVisible(false);

        closeTimerRef.current = setTimeout(() => {
            // Reset after animation
        }, 300);
    }

    function handleConfirm() {
        closeTimer();
        setIsVisible(false);

        closeTimerRef.current = setTimeout(() => {
            onConfirm(true);
        }, 300);
    }

    function handleCancel() {
        closeTimer();
        setIsVisible(false);

        closeTimerRef.current = setTimeout(() => {
            onConfirm(false);
        }, 300);
    }

    function closeTimer() {
        clearTimer();
    }

    return (
        <>
        {isOpen && (
            <div className={`fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-75 transition-all duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
                <div className={`flex mt-20 flex-col items-center gap-4 rounded bg-white p-6 shadow transition-all duration-300 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                    <CiCircleQuestion className="text-orange-400 text-6xl"/>
                    <p className="text-center text-lg">{message}</p>
                    <div className="flex gap-3">
                        <button onClick={handleCancel} className="flex-1 rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400">
                            Cancel
                        </button>
                        <button onClick={handleConfirm} className="flex-1 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}
