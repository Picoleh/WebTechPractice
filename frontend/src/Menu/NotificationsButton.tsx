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

    return(
        <div className="relative" ref={divRef}>
            <button className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 transition-colors text-[var(--text-color)] hover:bg-[var(--bg-color-100)]" onClick={() => setIsOpen(!isOpen)}>
                <IoIosNotificationsOutline size={24}/>
                Notifications
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-lg bg-[var(--bg-color-100)] shadow-lg" >
                    <div className="p-4">
                        <p className="text-sm text-[var(--text-color)]">No new notifications</p>
                    </div>
                </div>
            )}
        </div>
    );
}