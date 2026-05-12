import React from "react";
import { useEffect, useRef, useState } from "react";
import { CiCircleAlert, CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import type { AlertType } from "./Hooks/useAlert";

type AlertProps = {
  message: string;
  type: AlertType;
  isOpen: boolean;
  triggerId: number;
  onClose: () => void;
};

const typeStyles = {
    success: {
        icon: CiCircleCheck,
        color: "text-green-500",
        title: "Success",
    },
    error: {
        icon: CiCircleRemove,
        color: "text-red-500",
        title: "Error",
    },
    info: {
        icon: CiCircleAlert,
        color: "text-orange-500",
        title: "Info",
    },
};

export default function Alert({ message, type, isOpen, triggerId, onClose }: AlertProps) {
    const [isVisible, setIsVisible] = useState(isOpen);
    const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    function clearTimers() {
        if (openTimerRef.current) {
            clearTimeout(openTimerRef.current);
            openTimerRef.current = null;
        }

        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
            closeTimerRef.current = null;
        }
    }

    useEffect(() => {
        if (isOpen) {
            openAlert();
        }
        else {
            clearTimers();
            setIsVisible(false);
        }

        return clearTimers;
    }, [isOpen, triggerId]);


    function openAlert() {
        clearTimers();

        openTimerRef.current = setTimeout(() => {
            setIsVisible(true);
        }, 10);

        closeTimerRef.current = setTimeout(() => {
            closeAlert();
        }, 1500);
    }

    function closeAlert() {
        clearTimers();
        setIsVisible(false);

        closeTimerRef.current = setTimeout(() => {
            onClose();
        }, 300);
    }

    return (
        <>
        {isOpen && (
            <div className={`fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-75 transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} onClick={closeAlert}>
                <div className={`mt-20 flex flex-col items-center gap-2 rounded bg-white p-4 shadow transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
                    {React.createElement(typeStyles[type].icon, { className: `text-6xl ${typeStyles[type].color}` })}
                    <p className="text-lg font-semibold">{typeStyles[type].title}</p>
                    <p>{message}</p>
                </div>
            </div>
        )}
        </>
    );
}