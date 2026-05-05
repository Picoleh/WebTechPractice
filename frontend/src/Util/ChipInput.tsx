import { IoMdClose } from "react-icons/io";

type ChipInputProps<T> = {
    tags: T[];
    selectedTags: number[];
    onRemove: (tag: T) => void;
    getLabel: (tag: T) => string;
    getId: (tag: T) => number;
}

export default function ChipInput<T>({ tags, selectedTags, onRemove, getLabel, getId }: ChipInputProps<T>) {
    return (
        <div className="flex flex-row gap-4 justify-center flex-wrap">
            {selectedTags.map((tagId, index) => {
                const tag = tags.find(t => getId(t) === tagId);
                return tag ? (
                    <div key={index} className="flex flex-row gap-2 items-center bg-gray-200 px-3 py-1 rounded-full">
                        <span>{getLabel(tag)}</span>
                        <button onClick={() => onRemove(tag)} className="text-gray-500 hover:text-gray-700">
                            <IoMdClose size={20}/>
                        </button>
                    </div>
                ) : null;
            })}
        </div>
    );
}