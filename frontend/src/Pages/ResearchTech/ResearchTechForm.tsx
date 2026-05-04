import { useEffect, useState } from "react";
import { EmptyResearchTech, type ResearchTech } from "../../DataManagement/DataTypes";

type ResearchTechFormProps = {
    formData: ResearchTech;
    setFormData: React.Dispatch<React.SetStateAction<ResearchTech>>;
};

export default function ResearchTechForm({formData, setFormData}: ResearchTechFormProps) {

    const [selectedCostLevel, setSelectedCostLevel] = useState<string>(formData?.cost_level ?? "High");

    useEffect(() => {
            if (formData != null) {
                setFormData(formData);
            }
            else{
                setFormData(EmptyResearchTech());
            }
    
        },[formData]);
    
    return(
        <>
            <label className="font-bold">Name:</label>
            <input type="text" value={formData?.name ?? ""} onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))} className="w-full p-2 rounded border border-gray-400"/>

            <label className="font-bold">Description:</label>
            <textarea value={formData?.description ?? ""} onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))} className="w-full p-2 rounded border border-gray-400"/>

            <label className="font-bold">Cost Level:</label>
            <div className="flex flex-row justify-center">
                <button type="button" key={"High"}  className={`rounded-l-lg rounded-r-none border border-gray-400 p-3 w-full ${selectedCostLevel === "High" ? "bg-gray-200 border-teal-600 border-2 text-teal-600" : "bg-white"}`} onClick={() => {
                    setSelectedCostLevel("High");
                    setFormData(prev => ({...prev, cost_level: "High"}));
                }}>
                    High
                </button>
                <button type="button" key={"Moderate"} className={`border border-gray-400 p-3 w-full ${selectedCostLevel === "Moderate" ? "bg-gray-200 border-teal-600 border-2 text-teal-600" : "bg-white"}`} onClick={() => {
                    setSelectedCostLevel("Moderate");
                    setFormData(prev => ({...prev, cost_level: "Moderate"}));
                }}>
                    Moderate
                </button>
                <button type="button" key={"Low"} className={`rounded-l-none rounded-r-md border border-gray-400 p-3 w-full ${selectedCostLevel === "Low" ? "bg-gray-200 border-teal-600 border-2 text-teal-600" : "bg-white"}`} onClick={() => {
                    setSelectedCostLevel("Low");
                    setFormData(prev => ({...prev, cost_level: "Low"}));
                }}>
                    Low
                </button>
            </div>
        </>
    );
}