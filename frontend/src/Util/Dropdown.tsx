import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";

type DropdownProps<T> = {
  title: string;
  data: T[];
  settedValueId: number | null;
  onValueChange: (value: T) => void;
  getLabel: (item: T) => string;
  getId: (item: T) => number;
};

export default function Dropdown<T>({title, data, settedValueId, onValueChange, getLabel, getId} : DropdownProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<T>();

    useEffect(() => {
        console.log("Dropdown received settedValueId:", settedValueId);

        if(settedValueId !== null){
            setSelectedValue(data.find(item => {
                return getId(item) === settedValueId;
            }));
        }
        else{
            setSelectedValue(undefined);
        }
    }, [settedValueId]);

    return (
        <div className="relative w-full lg:w-auto">
            <button className="flex w-full items-center justify-center gap-2 rounded border border-gray-400 px-3 py-2 hover:bg-gray-100 lg:w-auto" onClick={() => setIsOpen(!isOpen)}>
                {selectedValue !== undefined ? getLabel(selectedValue) : title}
                <RiArrowDropDownLine size={24}/>
            </button>

            <div className={`absolute left-0 z-20 mt-2 w-full rounded border border-gray-300 bg-white shadow-lg lg:w-64 ${isOpen ? "block" : "hidden"}`}>
                <ul>
                    {data.map((option, index) => (
                        <label key={index} className="block cursor-pointer px-4 py-2 hover:bg-gray-100">
                                <button className="flex flex-row gap-2 items-center" onClick={() => {
                                    setSelectedValue(option);
                                    onValueChange(option);
                                    setIsOpen(false);
                                }}>
                                    <FaCheck size={16} className={`${selectedValue === option ? "block" : "hidden"}`}/>
                                    {getLabel(option)}
                                </button>
                        </label>
                    ))}
                </ul>
                
            </div>
        </div>
    );
}