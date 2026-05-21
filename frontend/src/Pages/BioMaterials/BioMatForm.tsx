import { useEffect, useRef, useState } from "react";
import { EmptyBiomaterial, type Biomaterial, type BiomaterialType } from "../../DataManagement/DataTypes";
import Dropdown from "../../Util/Dropdown";
import FileSelect from "../../Util/FileSelect";

type BioMatFormProps = {
    formData: Biomaterial;
    setFormData: React.Dispatch<React.SetStateAction<Biomaterial>>;
    biomaterialTypes: BiomaterialType[];
};

export default function BioMatForm({formData, setFormData, biomaterialTypes}: BioMatFormProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const thumbSize = 24;
    const min = 0;
    const max = 20;
    const [selectedBiocompatibility, setSelectedBiocompatibility] = useState<string>(formData?.biocompatibility ?? "High");
    const [percentage, setPercentage] = useState<number>(formData?.density != null ? (((formData.density - min) / (max - min)) * 100) : 0);
    
    const offset = thumbSize / 2 - (percentage / 100) * thumbSize;

    useEffect(() => {
        if (formData != null) {
            setBioMatFormData(formData);
            const dens = formData.density ?? 0;
            setPercentage(((dens - min) / (max - min)) * 100);
        }
        else{
            setFormData(EmptyBiomaterial());
            setSelectedBiocompatibility("High");
            if(fileInputRef.current)
                fileInputRef.current.value = "";
        }

    },[formData]);


    function handleTypeChange(type: BiomaterialType) {
        setFormData(prev => ({...prev, type_id: type.id}));
    }

    async function setBioMatFormData(bioMat: Biomaterial) {
        setFormData(bioMat);
        if(bioMat.biocompatibility == undefined){
            bioMat.biocompatibility = selectedBiocompatibility;
        }
        setSelectedBiocompatibility(bioMat.biocompatibility ?? "High");
    }

    return(
        <>
            <label className="font-bold">Name:</label>
            <input type="text" value={formData?.name ?? ""} onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))} className="w-full p-2 rounded border border-gray-400"/>

            <div className="flex flex-row gap-4 items-center justify-between">
                <div className="flex flex-row items-center gap-4 w-full">
                    <label className="font-bold">Type:</label>
                    <Dropdown title="Type" data={biomaterialTypes} settedValueId={formData?.type_id ?? null} expandRight={false} onValueChange={handleTypeChange} getLabel={(option) => option.name} getId={(option) => option.id}/>
                </div>

                <div className="flex flex-row items-center gap-4 w-full">
                    <label className="font-bold">Image:</label>
                    <FileSelect accept="image/*" onFileSelect={(file) => setFormData(prev => ({...prev, image: file}))}/>
                </div>
            </div>

            <label className="font-bold">Description:</label>
            <textarea value={formData?.description ?? ""} onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))} className="w-full p-2 rounded border border-gray-400"/>

            <label className="mb-6 font-bold">Density ($g/cm^3):</label>
            <div className="relative mx-2 align-middle">
                <div className="absolute -top-10 -translate-x-1/2 text-xl font-medium" style={{ left: `calc(${percentage}% + ${offset}px)` }}>
                    {(formData?.density ?? 0).toFixed(1)}
                </div>
                <div className="h-2 rounded-full bg-gray-200">
                    <div className="h-2 rounded-full bg-teal-700" style={{ width: `${percentage}%` }}/>
                </div>
                <input type="range" min="0" max="20" step={0.1} value={formData?.density ?? min} onChange={(e) => setFormData(prev => ({...prev, density: parseFloat(e.target.value)}))}
                    className="absolute -top-1 left-0 w-full appearance-none bg-transparent"/>
            </div>

            <label className="font-bold">Biocompatibility:</label>
            <div className="flex flex-row justify-center">
                <button type="button" key={"High"}  className={`rounded-l-lg rounded-r-none border border-gray-400 p-3 w-full 
                 ${selectedBiocompatibility === "High" ? "bg-[var(--bg-color-200)] border-teal-600 border-2 text-teal-600" : "bg-[var(--bg-color-100)]"}`} 
                 onClick={() => {
                    setSelectedBiocompatibility("High");
                    setFormData(prev => ({...prev, biocompatibility: "High"}));
                }}>
                    High
                </button>
                <button type="button" key={"Moderate"} className={`border border-gray-400 p-3 w-full  
                 ${selectedBiocompatibility === "Moderate" ? "bg-[var(--bg-color-200)] border-teal-600 border-2 text-teal-600" : "bg-[var(--bg-color-100)]"}`} 
                 onClick={() => {
                    setSelectedBiocompatibility("Moderate");
                    setFormData(prev => ({...prev, biocompatibility: "Moderate"}));
                }}>
                    Moderate
                </button>
                <button type="button" key={"Low"} className={`rounded-l-none rounded-r-md border border-gray-400 p-3 w-full 
                 ${selectedBiocompatibility === "Low" ? "bg-[var(--bg-color-200)] border-teal-600 border-2 text-teal-600" : "bg-[var(--bg-color-100)]"}`} 
                 onClick={() => {
                    setSelectedBiocompatibility("Low");
                    setFormData(prev => ({...prev, biocompatibility: "Low"}));
                }}>
                    Low
                </button>
            </div>
        </>
    );
}