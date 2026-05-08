import { useEffect, useRef, useState } from "react";
import { IoFilter } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import type { FilterDropdownProps } from "../DataManagement/DataTypes";


export default function FilterDropdown<T>({filterByTitle, data, onTypeChange, getLabel} : FilterDropdownProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          // verifica se o clique foi fora do dropdown
          if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
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
        <div className="relative w-full lg:w-auto" ref={dropdownRef}>
            <button className="flex w-full items-center justify-center gap-2 rounded border border-gray-400 px-3 py-2 hover:bg-gray-100 lg:w-auto" onClick={() => setIsOpen(!isOpen)}>
                <IoFilter size={24}/>
                Filter by {filterByTitle}
                <RiArrowDropDownLine size={24}/>
            </button>

            <div className={`absolute left-0 z-20 mt-2 w-full rounded border border-gray-300 bg-white shadow-lg lg:w-64 ${isOpen ? "block" : "hidden"}`}>
                <ul>
                    {data.map((option, index) => (
                        <label key={index} className="block cursor-pointer px-4 py-2 hover:bg-gray-100">
                                <input type="checkbox" className="mr-2" onChange={() => onTypeChange(option)}/>
                                {getLabel(option)}
                        </label>
                    ))}
                </ul>
                
            </div>
        </div>
    );
}