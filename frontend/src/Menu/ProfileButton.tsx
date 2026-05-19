import { useKeycloak } from "@react-keycloak/web";
import { useState, useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { FaCog, FaQuestionCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
export default function ProfileButton() {
    const { keycloak } = useKeycloak();

    const [isOpen, setIsOpen] = useState(false);
    const divRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        //console.log(keycloak.idTokenParsed);
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

  return (
    <div className="relative" ref={divRef}>
        <button className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-200" onClick={() => setIsOpen(!isOpen)}>
            <CgProfile size={24} />
            Profile
        </button>

        {isOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-lg bg-white shadow-lg flex flex-col p-4 gap-2">
                    <div className="flex flex-col">
                        <span className="font-bold">{keycloak.idTokenParsed?.name}</span>
                        <span className="text-sm text-gray-500">{keycloak.idTokenParsed?.email}</span>
                    </div>

                    <div className="border-t border-gray-400"/>

                    <div className="flex flex-col gap-2">
                        <button className="text-left hover:bg-gray-200 py-1 px-2 rounded flex flex-row items-center gap-4">
                            <FaCog size={24}/>
                            <h1 className="text-lg">Settings</h1>
                        </button>
                        <button className="text-left hover:bg-gray-200 py-1 px-2 rounded flex flex-row items-center gap-4">
                            <FaQuestionCircle size={24} />
                            <h1 className="text-lg">Help</h1>
                        </button>
                    </div>

                    <div className="border-t border-gray-400"/>

                    <div className="flex w-full">
                        <button className="text-left hover:bg-red-200 w-full py-1 px-2 rounded flex flex-row items-center gap-4 text-red-600" onClick={() => keycloak.logout()}>
                            <IoIosLogOut size={24} />
                            <h1 className="text-lg">Logout</h1>
                        </button>
                    </div>
                </div>
            )}
    </div>
  );
}