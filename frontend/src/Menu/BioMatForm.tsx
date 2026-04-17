import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import type { Biomaterial } from "./SearchComponent";
import { IoMdClose } from "react-icons/io";

export default function BioMatForm({isOpenState, onClose}: {isOpenState: boolean, onClose?: () => void}) {
    const {id} = useParams();
    const location = useLocation();

    const bioMatFromState = location.state?.biomaterial;

    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState<Biomaterial>({
        id: bioMatFromState?.id ?? 0,
        name: bioMatFromState?.name ?? "",
        type: bioMatFromState?.type ?? "",
        description: bioMatFromState?.description ?? "",
        density: bioMatFromState?.density ?? null,
        biocompatibility: bioMatFromState?.biocompatibility ?? "",
        created_at: bioMatFromState?.created_at ?? null,
    });

    const [selectedBiocompatibility, setSelectedBiocompatibility] = useState<string>("High");

    const thumbSize = 24;
    const min = 0;
    const max = 20;
    const percentage = ((formData.density ? formData.density - min : 0) / (max - min)) * 100;
    const offset = thumbSize / 2 - (percentage / 100) * thumbSize;
    return(
        <>
        {isOpenState && <div className="fixed inset-0 bg-black/30" onClick={onClose}/>}

        <aside className={`fixed top-16 right-0 w-1/6 bg-white text-black h-full p-4 shadow-lg transition-all duration-300 ${isOpenState ? "translate-x-0" : "translate-x-full"}`}>
            <div className="flex flex-col">
                <div className="flex flex-row">
                    <label className="font-bold">{isEditMode ? "Edit Biomaterial" : "Create New Biomaterial"}</label>
                    <button onClick={onClose} className="ml-auto px-2 py-1 rounded hover:bg-gray-300">
                        <IoMdClose size={20}/>
                    </button>
                </div>
                <div className="flex flex-col mt-4 gap-4">
                    <label className="font-bold">Name:</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-2 rounded border border-gray-400"/>

                    <label className="font-bold">Type:</label>
                    <input type="dropdown" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full p-2 rounded border border-gray-400"/>

                    <label className="font-bold">Description:</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-2 rounded border border-gray-400"/>

                    <label className="mb-6 font-bold">Density ($g/cm^3):</label>
                    <div className="relative">
                        <div className="absolute -top-10 -translate-x-1/2 text-xl font-medium" style={{ left: `calc(${percentage}% + ${offset}px)` }}>
                            {formData.density?.toFixed(1) ?? "0.0"}
                        </div>
                        <div className="h-2 rounded-full bg-gray-200">
                            <div className="h-2 rounded-full bg-teal-700" style={{ width: `${percentage}%` }}/>
                        </div>
                        <input type="range" min="0" max="20" step={0.1} value={formData.density ?? ""} onChange={(e) => setFormData({...formData, density: parseFloat(e.target.value)})}
                         className="absolute -top-1 left-0 w-full appearance-none bg-transparent"/>
                    </div>

                    <label className="font-bold">Biocompatibility:</label>
                    <div className="flex flex-row justify-center">
                        <button key={"High"}  className={`rounded-l-lg rounded-r-none border border-gray-400 p-3 w-full ${selectedBiocompatibility === "High" ? "bg-gray-200 border-teal-600 border-2 text-teal-600" : "bg-white"}`} onClick={() => setSelectedBiocompatibility("High")}>
                            High
                        </button>
                        <button key={"Moderate"} className={`border border-gray-400 p-3 w-full ${selectedBiocompatibility === "Moderate" ? "bg-gray-200 border-teal-600 border-2 text-teal-600" : "bg-white"}`} onClick={() => setSelectedBiocompatibility("Moderate")}>
                            Moderate
                        </button>
                        <button key={"Low"} className={`rounded-l-none rounded-r-md border border-gray-400 p-3 w-full ${selectedBiocompatibility === "Low" ? "bg-gray-200 border-teal-600 border-2 text-teal-600" : "bg-white"}`} onClick={() => setSelectedBiocompatibility("Low")}>
                            Low
                        </button>
                    </div>

                    <button className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 rounded-md mt-4">
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