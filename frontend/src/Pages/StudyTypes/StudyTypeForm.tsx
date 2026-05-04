import { useEffect, useState } from "react";
import { EmptyStudyType, type StudyType } from "../../DataManagement/DataTypes";

type StudyTypeFormProps = {
    formData: StudyType;
    setFormData: React.Dispatch<React.SetStateAction<StudyType>>;
};

export default function StudyTypeForm({formData, setFormData}: StudyTypeFormProps) {

    const [selectedLevelOfEvidence, setSelectedLevelOfEvidence] = useState<string>(formData?.level_evidence ?? "High");

    useEffect(() => {
            if (formData != null) {
                setFormData(formData);
            }
            else{
                setFormData(EmptyStudyType());
            }
    
        },[formData]);
    
    return(
        <>
            <label className="font-bold">Name:</label>
            <input type="text" value={formData?.name ?? ""} onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))} className="w-full p-2 rounded border border-gray-400"/>

            <label className="font-bold">Description:</label>
            <textarea value={formData?.description ?? ""} onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))} className="w-full p-2 rounded border border-gray-400"/>

            <label className="font-bold">Level of Evidence:</label>
            <div className="flex flex-row justify-center">
                <button type="button" key={"High"}  className={`rounded-l-lg rounded-r-none border border-gray-400 p-3 w-full ${selectedLevelOfEvidence === "High" ? "bg-gray-200 border-teal-600 border-2 text-teal-600" : "bg-white"}`} onClick={() => {
                    setSelectedLevelOfEvidence("High");
                    setFormData(prev => ({...prev, level_evidence: "High"}));
                }}>
                    High
                </button>
                <button type="button" key={"Moderate"} className={`border border-gray-400 p-3 w-full ${selectedLevelOfEvidence === "Moderate" ? "bg-gray-200 border-teal-600 border-2 text-teal-600" : "bg-white"}`} onClick={() => {
                    setSelectedLevelOfEvidence("Moderate");
                    setFormData(prev => ({...prev, level_evidence: "Moderate"}));
                }}>
                    Moderate
                </button>
                <button type="button" key={"Low"} className={`rounded-l-none rounded-r-md border border-gray-400 p-3 w-full ${selectedLevelOfEvidence === "Low" ? "bg-gray-200 border-teal-600 border-2 text-teal-600" : "bg-white"}`} onClick={() => {
                    setSelectedLevelOfEvidence("Low");
                    setFormData(prev => ({...prev, level_evidence: "Low"}));
                }}>
                    Low
                </button>
            </div>
        </>
    );
}