import { useState } from "react";
import { FaEyeSlash,FaEye } from "react-icons/fa6";

export default function Password({placeholder, onChange}: {placeholder: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
    const [isShowing, setIsShowing] = useState(false);

    return (
        <div className="w-full relative">
            <input type={isShowing ? "text" : "password"} placeholder={placeholder} className="w-full h-full p-2 rounded-r shadow" onChange={onChange}/>
            <button onClick={() => setIsShowing(!isShowing)} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                {isShowing ? <FaEye /> : <FaEyeSlash />}
            </button>
        </div>


    );
}