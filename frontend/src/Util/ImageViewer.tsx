import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function ImageViewer({ src }: { src: string }) {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
    <div>
        <button disabled={src === "null"} className="bg-slate-300 p-1 rounded  disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600" onClick={() => setIsOpen(true)}>
            View Image
        </button>

        {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setIsOpen(false)}>
                <div className="relative items-center justify-center bg-gray-300">
                    <img src={src} alt="Full Size" className="" />
                    <button className="absolute top-2 right-2 border border-black rounded-full p-1" onClick={() => setIsOpen(false)}>
                        <IoMdClose size={20} />
                    </button>
                </div>
            </div>
        )}
    </div>
  );
}