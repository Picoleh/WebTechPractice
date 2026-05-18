import { useEffect, useState } from "react";
import { fetchData } from "../../DataManagement/DataManager";
import type { Biomaterial, Experiment, ResearchTech, StudyType } from "../../DataManagement/DataTypes";
import AsideCrudForm from "../../Util/Pages/AsideCrudForm";
import Crud from "../crud/Crud";
import ExperimentForm from "./ExperimentForm";
import type { MRT_ColumnDef } from "material-react-table";


const columns: MRT_ColumnDef<Experiment>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "objective", header: "Objective" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "start_date", header: "Start Date" },
    { accessorKey: "end_date", header: "End Date" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "biomaterial_id", header: "Biomaterial ID" },
    { accessorKey: "study_type_id", header: "Study Type ID" },
    { accessorKey: "results", header: "Results" },
    { accessorKey: "created_at", header: "Created At" },
];

export default function Experiments() {

    const [biomaterials, setBiomaterials] = useState<Biomaterial[]>([]);
    const [studyTypes, setStudyTypes] = useState<StudyType[]>([]);
    const [researchTechs, setResearchTechs] = useState<ResearchTech[]>([]);

    async function loadExperiments() {
        try {
            let fetch_path = `experiments`;
            const responseJson = await fetchData(fetch_path);
            const result = responseJson as Experiment[];
            return result;
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
            setBiomaterials(biomaterialsResponse as Biomaterial[]);

            const studyTypesResponse = await fetchData("studyTypes");
            setStudyTypes(studyTypesResponse as StudyType[]);

            const researchTechsResponse = await fetchData("researchTechs");
            setResearchTechs(researchTechsResponse as ResearchTech[]);
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