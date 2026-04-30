import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

type FormProps<T> = {
    formData: T;
    setFormData: React.Dispatch<React.SetStateAction<T>>;
}

type AsideCrudFormProps<T> = {
    isOpenState: boolean;
    onClose?: () => void;
    editingObject: T | null;
    onUpdate?: () => void;
    onAdd: (item: T) => Promise<void>;
    children: (props: FormProps<T>) => React.ReactNode;
};

export default function AsideCrudForm<T>({isOpenState, onClose, editingObject, onUpdate, onAdd, children}: AsideCrudFormProps<T>) {
    const isEditMode = editingObject !== null;
    const [formData, setFormData] = useState<T>(editingObject as T);

    useEffect(() => {
        console.log("ed obj arrived in form:", editingObject);
        if(editingObject !== null){
            setFormData(editingObject);
        } else {
            setFormData(null as T);
        }
    }, [editingObject]);
    return (
        <>
                {isOpenState && <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose}/>}
        
                <aside className={`fixed right-0 top-0 z-50 h-screen w-full bg-white p-4 text-black shadow-lg transition-all duration-300 sm:w-[420px] lg:w-[520px] ${isOpenState ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="flex h-full flex-col overflow-y-auto">
                        <div className="flex flex-row items-start gap-3">
                            <label className="font-bold">{isEditMode ? "Ahhh" : "Ohhhh"}</label>
                            <button onClick={onClose} className="ml-auto px-2 py-1 rounded hover:bg-gray-300">
                                <IoMdClose size={20}/>
                            </button>
                        </div>
                        <div className="mt-4 flex flex-col gap-4">

                            {children(
                                {
                                    formData,
                                    setFormData
                                }
                            )}

                            <button className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 rounded-md mt-4" onClick={isEditMode ? onUpdate : () => onAdd(formData)}>
                                Save
                            </button>
                            <button className="bg-white hover:bg-gray-200 text-black border border-gray-400 px-4 py-2 rounded-md mt-4" onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </aside>
                </>
    );
}