import { useEffect, useState } from "react";
import { EmptyExperiment, type Biomaterial, type Experiment, type ResearchTech, type StudyType } from "../../DataManagement/DataTypes";
import Dropdown from "../../Util/Dropdown";
import MultiTags from "../../Util/MultiTags";
import ChipInput from "../../Util/ChipInput";

type ExperimentFormProps = {
    formData: Experiment;
    setFormData: React.Dispatch<React.SetStateAction<Experiment>>;
    biomaterials: Biomaterial[];
    studyTypes: StudyType[];
    researchTechs: ResearchTech[];
};

export default function ExperimentForm({formData, setFormData, biomaterials, studyTypes, researchTechs}: ExperimentFormProps) {

    const [selectedStatus, setSelectedStatus] = useState<string>(formData?.status ?? "Completed");
    // const [selectedResearchTechs, setSelectedResearchTechs] = useState<number[]>([]);

    useEffect(() => {
            if (formData != null) {
                setFormData(formData);
                setSelectedStatus(formData.status ?? "Completed");
            }
            else{
                setFormData(EmptyExperiment());
                // setSelectedResearchTechs([]); 
            }
            
        },[formData]);

    function handleResearchTechChange(tag: ResearchTech){
        setFormData(prev => {
            if(prev.research_tech_ids?.some(t => t === tag.id)){
                return prev;
            }
            else{
                return {...prev, research_tech_ids: [...(prev.research_tech_ids || []), tag.id]};
            }
        });
    }
    
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
                <input type="date" value={formData?.start_date ?? ""} onChange={(e) => setFormData(prev => ({...prev, start_date: e.target.value}))} className="w-full p-2 rounded border border-gray-400 bg-[var(--bg-color-100)]"/>

                <label className="font-bold">End Date:</label>
                <input type="date" value={formData?.end_date ?? ""} onChange={(e) => setFormData(prev => ({...prev, end_date: e.target.value}))} className="w-full p-2 rounded border border-gray-400 bg-[var(--bg-color-100)]"/>
            </div>

            <div className="flex flex-row gap-4 items-center">
                <label className="font-bold">Biomaterial:</label>
                <Dropdown title="Biomaterial" data={biomaterials} settedValueId={formData?.biomaterial_id ?? null} expandRight={false} onValueChange={(option) => setFormData(prev => ({...prev, biomaterial_id: option.id}))} getLabel={(option) => option.name} getId={(option) => option.id}/>

                <label className="font-bold">Study Type:</label>
                <Dropdown title="Study Type" data={studyTypes} settedValueId={formData?.study_type_id ?? null} expandRight={true} onValueChange={(option) => setFormData(prev => ({...prev, study_type_id: option.id}))} getLabel={(option) => option.name} getId={(option) => option.id}/>

            </div>

            <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-4 items-center">
                    <label className="font-bold">Research Technologies:</label>
                    <MultiTags title="Tags" tags={researchTechs} selectedTags={formData?.research_tech_ids || []} getLabel={(tag) => tag.name} getId={(tag) => tag.id} onChange={handleResearchTechChange}/>
                </div>
                <ChipInput tags={researchTechs} selectedTags={formData?.research_tech_ids || []} getLabel={(tag) => tag.name} getId={(tag) => tag.id} onRemove={(tag) => setFormData(prev => ({...prev, research_tech_ids: prev.research_tech_ids?.filter(id => id !== tag.id)}))}/>
            </div>

            <label className="font-bold">Results:</label>
            <textarea value={formData?.results ?? ""} onChange={(e) => setFormData(prev => ({...prev, results: e.target.value}))} className="w-full p-2 rounded border border-gray-400"/>

            <label className="font-bold">Status:</label>
            <div className="flex flex-row justify-center">
                <button type="button" key={"Completed"}  className={`rounded-l-lg rounded-r-none border border-gray-400 p-3 w-full 
                ${selectedStatus === "Completed" ? "bg-[var(--bg-color-200)] border-teal-600 border-2 text-teal-600" : "bg-[var(--bg-color-100)]"}`} 
                onClick={() => {
                    setSelectedStatus("Completed");
                    setFormData(prev => ({...prev, status: "Completed"}));
                }}>
                    Completed
                </button>
                <button type="button" key={"In Progress"} className={`border border-gray-400 p-3 w-full 
                ${selectedStatus === "In Progress" ? "bg-[var(--bg-color-200)] border-teal-600 border-2 text-teal-600" : "bg-[var(--bg-color-100)]"}`} 
                onClick={() => {
                    setSelectedStatus("In Progress");
                    setFormData(prev => ({...prev, status: "In Progress"}));
                }}>
                    In Progress
                </button>
                <button type="button" key={"Failed"} className={`rounded-l-none rounded-r-md border border-gray-400 p-3 w-full 
                ${selectedStatus === "Failed" ? "bg-[var(--bg-color-200)] border-teal-600 border-2 text-teal-600" : "bg-[var(--bg-color-100)]"}`} 
                onClick={() => {
                    setSelectedStatus("Failed");
                    setFormData(prev => ({...prev, status: "Failed"}));
                }}>
                    Failed
                </button>
            </div>
        </>
    );
}