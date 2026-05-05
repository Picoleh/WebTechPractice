import { useEffect, useState } from "react";
import { fetchData } from "../../DataManagement/DataManager";
import type { Biomaterial, Experiment, ResearchTech, StudyType } from "../../DataManagement/DataTypes";
import AsideCrudForm from "../../Util/Pages/AsideCrudForm";
import Crud from "../crud/Crud";
import ExperimentForm from "./ExperimentForm";


const columns: Array<{ key: keyof Experiment; label: string }> = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "objective", label: "Objective" },
    { key: "description", label: "Description" },
    { key: "start_date", label: "Start Date" },
    { key: "end_date", label: "End Date" },
    { key: "status", label: "Status" },
    { key: "biomaterial_id", label: "Biomaterial ID" },
    { key: "study_type_id", label: "Study Type ID" },
    { key: "results", label: "Results" },
    { key: "created_at", label: "Created At" },
];

export default function Experiments() {

    const [biomaterials, setBiomaterials] = useState<Biomaterial[]>([]);
    const [studyTypes, setStudyTypes] = useState<StudyType[]>([]);
    const [researchTechs, setResearchTechs] = useState<ResearchTech[]>([]);

    async function loadExperiments(searchTerm: string, page: number) {
        try {
            let fetch_path = `experiments?page=${page}`;
            if (searchTerm.trim() !== "") {
                fetch_path = `experiments/search?q=${encodeURIComponent(searchTerm)}&page=${page}`;
            }
            
            const responseJson = await fetchData(fetch_path);
            const result = responseJson.data as Experiment[];
            return {
                data: result,
                totalPages: Math.ceil(responseJson.meta.total / responseJson.meta.per_page),
            };
        } catch (err) {
            throw console.error(err);
        }
    }

    async function addExperiment(obj: Experiment) {
        console.log("Adding experiment:", obj);
        
        try {
            await fetchData("experiments", "POST", obj);
        }
        catch (err) {
            console.error(err);
        }
    }

    async function updateExperiment(obj: Experiment) {
        console.log("Updating experiment:", obj);
        try {
            await fetchData(`experiments/${obj.id}`, "PUT", obj);
        }
        catch (err) {
            console.error("Unknown error while fetching data");
        }
    }

    async function deleteExperiment(obj: Experiment) {
        try{
            const json = await fetchData(`experiments/${obj.id}`, "DELETE");
            return json;
        }
        catch (err) {
            throw console.error(err);
        }
    }

    async function loadDropdownData() {
        try {
            const biomaterialsResponse = await fetchData("biomaterials");
            setBiomaterials(biomaterialsResponse.data as Biomaterial[]);

            const studyTypesResponse = await fetchData("studyTypes");
            setStudyTypes(studyTypesResponse.data as StudyType[]);

            const researchTechsResponse = await fetchData("researchTechs");
            setResearchTechs(researchTechsResponse.data as ResearchTech[]);
        }
        catch (err) {
            console.error("Unknown error while fetching data");
        }
    }

    useEffect(() => {
        loadDropdownData();
    }, []);

    return(
        <Crud
            columns={columns}
            loadData={loadExperiments}
            onAddItem={addExperiment}
            onUpdateItem={updateExperiment}
            onDeleteItem={deleteExperiment}
            searchPlaceholder="Search experiments..."
            form={(crudProps) => (
                <AsideCrudForm title="Experiment" isOpenState={crudProps.isFormOpen} editingObject={crudProps.editingObj} onClose={() => crudProps.toggleForm(null)} onUpdate={crudProps.onUpdate} onAdd={crudProps.onAdd}
                    children={(asideFormProps) => (
                        <ExperimentForm formData={asideFormProps.formData} setFormData={asideFormProps.setFormData} biomaterials={biomaterials} studyTypes={studyTypes} researchTechs={researchTechs}/>
                    )}/>
            )}
        />
    );
}