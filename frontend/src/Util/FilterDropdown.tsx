import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function FilterDropdown({filterByTitle, data, onTypeChange} : {filterByTitle: string, data: string[], onTypeChange: (type: string) => void}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <button className="border border-gray-400 rounded px-3 py-2 flex flex-row items-center justify-center gap-2 hover:bg-gray-100" onClick={() => setIsOpen(!isOpen)}>
                <IoFilter size={28}/>
                Filter by {filterByTitle}
                <RiArrowDropDownLine size={28}/>
            </button>

            <div className={`absolute mt-2 bg-white border border-gray-300 rounded shadow-lg ${isOpen ? "block" : "hidden"}`}>
                <ul>
                    {data.map((option, index) => (
                        <label>
                            <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                <input type="checkbox" className="mr-2" onChange={() => onTypeChange(option)}/>
                                {option}
                            </li>
                        </label>
                    ))}
                </ul>
                
            </div>
        </div>
    );
}