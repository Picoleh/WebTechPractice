import { useState } from "react";
import { FaHashtag } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";

type MultiTagsProps<T> = {
    tags: T[];
    selectedTags: number[];
    title: string;
    onChange: (tag: T) => void;
    getLabel: (tag: T) => string;
    getId: (tag: T) => number;
}

export default function MultiTags<T>({ tags, selectedTags, title, onChange, getLabel, getId }: MultiTagsProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
        <div className="relative w-full lg:w-auto">
            <button className="flex w-full items-center justify-center gap-2 rounded border border-gray-400 px-3 py-2 hover:bg-gray-100 lg:w-auto" onClick={() => setIsOpen(!isOpen)}>
                <FaHashtag size={24}/>
                {title}
                <RiArrowDropDownLine size={24}/>
            </button>

            <div className={`absolute left-0 z-20 mt-2 w-full rounded border border-gray-300 bg-white shadow-lg lg:w-64 ${isOpen ? "block" : "hidden"}`}>
                <ul>
                    {tags.map((option, index) => (
                        <label key={index} className="block cursor-pointer px-4 py-2 hover:bg-gray-100">
                                <button className={`w-full text-left ${selectedTags.some(t => t === getId(option)) ? "opacity-50 cursor-auto" : "opacity-100"}`} onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}>
                                {getLabel(option)}
                                </button>
                        </label>
                    ))}
                </ul>
            </div>
        </div>
        </>
    );
}