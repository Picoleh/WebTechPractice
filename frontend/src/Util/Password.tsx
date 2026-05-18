import { useState } from "react";
import { FaEyeSlash,FaEye } from "react-icons/fa6";

export default function Password({placeholder}: {placeholder: string}) {
    const [isShowing, setIsShowing] = useState(false);

    return (
        <div className="w-full relative">
            <input type={isShowing ? "text" : "password"} placeholder={placeholder} className="w-full h-full p-2 rounded-r shadow"/>
            <button onClick={() => setIsShowing(!isShowing)} className="absolute right-2 top-1/2 transform -translate-y-1/2">
                {isShowing ? <FaEye /> : <FaEyeSlash />}
            </button>
        </div>


    );
}