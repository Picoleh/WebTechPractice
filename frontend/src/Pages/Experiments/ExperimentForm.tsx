import { useEffect, useState } from "react";
import { EmptyExperiment, type Biomaterial, type Experiment, type StudyType } from "../../DataManagement/DataTypes";
import Dropdown from "../../Util/Dropdown";

type ExperimentFormProps = {
    formData: Experiment;
    setFormData: React.Dispatch<React.SetStateAction<Experiment>>;
    biomaterials: Biomaterial[];
    studyTypes: StudyType[];
};

export default function ExperimentForm({formData, setFormData, biomaterials, studyTypes}: ExperimentFormProps) {

    const [selectedStatus, setSelectedStatus] = useState<string>(formData?.status ?? "Completed");

    useEffect(() => {
            if (formData != null) {
                setFormData(formData);
            }
            else{
                setFormData(EmptyExperiment());
            }
    
        },[formData]);
    
    return(
        <>
            <label className="font-bold">Title:</label>
            <input type="text" value={formData?.title ?? ""} onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))} className="w-full p-2 rounded border border-gray-400"/>

            <label className="font-bold">Objective:</label>
            <input type="text" value={formData?.objective ?? ""} onChange={(e) => setFormData(prev => ({...prev, objective: e.target.value}))} className="w-full p-2 rounded border border-gray-400"/>

            <label className="font-bold">Description:</label>
            <textarea value={formData?.description ?? ""} onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))} className="w-full p-2 rounded border border-gray-400"/>

            <div className="flex flex-row gap-4 items-center">
                <label className="font-bold">Start Date:</label>
                <input type="date" value={formData?.start_date ?? ""} onChange={(e) => setFormData(prev => ({...prev, start_date: e.target.value}))} className="w-full p-2 rounded border border-gray-400"/>

                <label className="font-bold">End Date:</label>
                <input type="date" value={formData?.end_date ?? ""} onChange={(e) => setFormData(prev => ({...prev, end_date: e.target.value}))} className="w-full p-2 rounded border border-gray-400"/>
            </div>

            <div className="flex flex-row gap-4 items-center">
                <label className="font-bold">Biomaterial:</label>
                <Dropdown title="Biomaterial" data={biomaterials} settedValueId={formData?.biomaterial_id ?? null} expandRight={false} onValueChange={(option) => setFormData(prev => ({...prev, biomaterial_id: option.id}))} getLabel={(option) => option.name} getId={(option) => option.id}/>

                <label className="font-bold">Study Type:</label>
                <Dropdown title="Study Type" data={studyTypes} settedValueId={formData?.study_type_id ?? null} expandRight={true} onValueChange={(option) => setFormData(prev => ({...prev, study_type_id: option.id}))} getLabel={(option) => option.name} getId={(option) => option.id}/>

            </div>

            <label className="font-bold">Results:</label>
            <textarea value={formData?.results ?? ""} onChange={(e) => setFormData(prev => ({...prev, results: e.target.value}))} className="w-full p-2 rounded border border-gray-400"/>

            <label className="font-bold">Status:</label>
            <div className="flex flex-row justify-center">
                <button type="button" key={"Completed"}  className={`rounded-l-lg rounded-r-none border border-gray-400 p-3 w-full ${selectedStatus === "Completed" ? "bg-gray-200 border-teal-600 border-2 text-teal-600" : "bg-white"}`} onClick={() => {
                    setSelectedStatus("Completed");
                    setFormData(prev => ({...prev, status: "Completed"}));
                }}>
                    Completed
                </button>
                <button type="button" key={"In Progress"} className={`border border-gray-400 p-3 w-full ${selectedStatus === "In Progress" ? "bg-gray-200 border-teal-600 border-2 text-teal-600" : "bg-white"}`} onClick={() => {
                    setSelectedStatus("In Progress");
                    setFormData(prev => ({...prev, status: "In Progress"}));
                }}>
                    In Progress
                </button>
                <button type="button" key={"Failed"} className={`rounded-l-none rounded-r-md border border-gray-400 p-3 w-full ${selectedStatus === "Failed" ? "bg-gray-200 border-teal-600 border-2 text-teal-600" : "bg-white"}`} onClick={() => {
                    setSelectedStatus("Failed");
                    setFormData(prev => ({...prev, status: "Failed"}));
                }}>
                    Failed
                </button>
            </div>
        </>
    );
}