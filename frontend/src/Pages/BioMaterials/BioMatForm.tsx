import { useEffect, useState } from "react";
import type { Biomaterial } from "./SearchComponent";
import { IoMdClose } from "react-icons/io";
import { fetchData } from "../../DataManagement/DataManager";

export default function BioMatForm({isOpenState, onClose, editingId, onUpdate}: {isOpenState: boolean, onClose?: () => void, editingId: number | null, onUpdate?: () => void}) {
    const isEditMode = editingId !== null;

    const [formData, setFormData] = useState<Biomaterial>({
        id: 0,
        name: "",
        type: "",
        description: "",
        density: null,
        biocompatibility: "",
        created_at: null,
    });

    const [selectedBiocompatibility, setSelectedBiocompatibility] = useState<string>("High");

    const thumbSize = 24;
    const min = 0;
    const max = 20;
    const percentage = ((formData.density ? formData.density - min : 0) / (max - min)) * 100;
    const offset = thumbSize / 2 - (percentage / 100) * thumbSize;

    useEffect(() => {
        if (editingId === null) {
            setFormData({
                id: 0,
                name: "",
                type: "",
                description: "",
                density: null,
                biocompatibility: "",
                created_at: null,
            });
            setSelectedBiocompatibility("High");
            return;
        }

        void setBioMatFormData(editingId);
    }, [editingId]);

    async function setBioMatFormData(id: number){
        console.log("Setting form data for id:", id);

        const json = await fetchData(`biomaterials/${id}`);

        const data = json as Biomaterial;
        setFormData(data);
        setSelectedBiocompatibility(data.biocompatibility || "High");
    }

    async function Add() {
        console.log("Adding biomaterial:", formData);
        try {
            const json = await fetchData("biomaterials", "POST", formData);

            alert("Biomaterial added with ID: " + json.data.id);
        }
        catch (err) {
            console.error("Unknown error while fetching data");
        }

        onClose?.();
        onUpdate?.();
    }

    async function Update() {
        console.log("Updating biomaterial:", formData);
        try {
            const json = await fetchData(`biomaterials/${editingId}`, "PUT", formData);
            
            alert("Biomaterial updated with ID: " + json.data.id);
        }
        catch (err) {
            console.error("Unknown error while fetching data");
        }

        onClose?.();
        onUpdate?.();
    }

    return(
        <>
        {isOpenState && <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose}/>}

        <aside className={`fixed right-0 top-0 z-50 h-screen w-full bg-white p-4 text-black shadow-lg transition-all duration-300 sm:w-[420px] lg:w-[520px] ${isOpenState ? "translate-x-0" : "translate-x-full"}`}>
            <div className="flex h-full flex-col overflow-y-auto">
                <div className="flex flex-row items-start gap-3">
                    <label className="font-bold">{isEditMode ? "Edit Biomaterial" : "Create New Biomaterial"}</label>
                    <button onClick={onClose} className="ml-auto px-2 py-1 rounded hover:bg-gray-300">
                        <IoMdClose size={20}/>
                    </button>
                </div>
                <div className="mt-4 flex flex-col gap-4">
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
                        <button type="button" key={"High"}  className={`rounded-l-lg rounded-r-none border border-gray-400 p-3 w-full ${selectedBiocompatibility === "High" ? "bg-gray-200 border-teal-600 border-2 text-teal-600" : "bg-white"}`} onClick={() => {
                            setSelectedBiocompatibility("High");
                            setFormData({...formData, biocompatibility: "High"});
                        }}>
                            High
                        </button>
                        <button type="button" key={"Moderate"} className={`border border-gray-400 p-3 w-full ${selectedBiocompatibility === "Moderate" ? "bg-gray-200 border-teal-600 border-2 text-teal-600" : "bg-white"}`} onClick={() => {
                            setSelectedBiocompatibility("Moderate");
                            setFormData({...formData, biocompatibility: "Moderate"});
                        }}>
                            Moderate
                        </button>
                        <button type="button" key={"Low"} className={`rounded-l-none rounded-r-md border border-gray-400 p-3 w-full ${selectedBiocompatibility === "Low" ? "bg-gray-200 border-teal-600 border-2 text-teal-600" : "bg-white"}`} onClick={() => {
                            setSelectedBiocompatibility("Low");
                            setFormData({...formData, biocompatibility: "Low"});
                        }}>
                            Low
                        </button>
                    </div>

                    <button className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 rounded-md mt-4" onClick={isEditMode ? Update : Add}>
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