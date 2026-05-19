import { fetchData } from "../../DataManagement/DataManager";
import type { ResearchTech } from "../../DataManagement/DataTypes";
import Crud from "../crud/Crud";
import AsideCrudForm from "../../Util/Pages/AsideCrudForm";
import ResearchTechForm from "./ResearchTechForm";
import type { MRT_ColumnDef } from "material-react-table";
import { useKeycloak } from "@react-keycloak/web";

const columns: MRT_ColumnDef<ResearchTech>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "cost_level", header: "Cost Level" },
    { accessorKey: "created_at", header: "Created At" },
];

export default function ResearchTech() {
    const {keycloak} = useKeycloak();

    async function loadResearchTech() {
        try {
            let fetch_path = `researchTechs`;
            const responseJson = await fetchData(fetch_path);
            const result = responseJson as ResearchTech[];
            return result;
        } catch (err) {
            throw console.error(err);
        }
    }

    async function addResearchTech(obj: ResearchTech) {
        console.log("Adding research technology:", obj);
        
        try {
            obj.added_by = keycloak.idTokenParsed?.sub || null
            await fetchData("researchTechs", "POST", obj);
        }
        catch (err) {
            console.error(err);
        }
    }

    async function updateResearchTech(obj: ResearchTech) {
        console.log("Updating research technology:", obj);
        try {
            await fetchData(`researchTechs/${obj.id}`, "PUT", obj);
        }
        catch (err) {
            console.error("Unknown error while fetching data");
        }
    }

    async function deleteResearchTech(obj: ResearchTech) {
        try{
            const json = await fetchData(`researchTechs/${obj.id}`, "DELETE");
            return json;
        }
        catch (err) {
            throw console.error(err);
        }
    }

    return(
        <Crud
            columns={columns}
            loadData={loadResearchTech}
            onAddItem={addResearchTech}
            onUpdateItem={updateResearchTech}
            onDeleteItem={deleteResearchTech}
            searchPlaceholder="Search research technologies..."
            form={(crudProps) => (
                <AsideCrudForm title="Research Technology" isOpenState={crudProps.isFormOpen} editingObject={crudProps.editingObj} onClose={() => crudProps.toggleForm(null)} onUpdate={crudProps.onUpdate} onAdd={crudProps.onAdd}
                    children={(asideFormProps) => (
                        <ResearchTechForm formData={asideFormProps.formData} setFormData={asideFormProps.setFormData}/>
                    )}/>
            )}
        />
    );
}