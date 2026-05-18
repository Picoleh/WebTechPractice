import { useEffect, useRef, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";

export default function NotificationsButton() {
    const [isOpen, setIsOpen] = useState(false);
    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                divRef.current &&
                !divRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        console.log("uepa");
    }, [isOpen]);

    return(
        <div className="relative">
            <button className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-200" onClick={() => setIsOpen(!isOpen)}>
                <IoIosNotificationsOutline size={24}/>
                Notifications
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-lg bg-white shadow-lg" ref={divRef}>
                    <div className="p-4">
                        <p className="text-sm text-gray-700">No new notifications</p>
                    </div>
                </div>
            )}
        </div>
    );
}