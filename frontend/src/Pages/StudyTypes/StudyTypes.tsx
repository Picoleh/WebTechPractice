import { fetchData } from "../../DataManagement/DataManager";
import type { StudyType } from "../../DataManagement/DataTypes";
import Crud from "../crud/Crud";
import StudyTypeForm from "./StudyTypeForm";
import AsideCrudForm from "../../Util/Pages/AsideCrudForm";
import type { MRT_ColumnDef } from "material-react-table";

const columns: MRT_ColumnDef<StudyType>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "level_evidence", header: "Level of Evidence" },
    { accessorKey: "created_at", header: "Created At" },
];

export default function StudyTypes() {

    async function loadStudyTypes(searchTerm: string) {
        try {
            let fetch_path = `studyTypes`;
            if (searchTerm.trim() !== "") {
                fetch_path = `studyTypes/search?q=${encodeURIComponent(searchTerm)}`;
            }
            
            const responseJson = await fetchData(fetch_path);
            const result = responseJson as StudyType[];
            return result;
        } catch (err) {
            throw console.error(err);
        }
    }

    async function addStudyType(obj: StudyType) {
        console.log("Adding study type:", obj);
        
        try {
            await fetchData("studyTypes", "POST", obj);
        }
        catch (err) {
            console.error(err);
        }
    }

    async function updateStudyType(obj: StudyType) {
        console.log("Updating study type:", obj);
        try {
            await fetchData(`studyTypes/${obj.id}`, "PUT", obj);
        }
        catch (err) {
            console.error("Unknown error while fetching data");
        }
    }

    async function deleteStudyType(obj: StudyType) {
        try{
            const json = await fetchData(`studyTypes/${obj.id}`, "DELETE");
            return json;
        }
        catch (err) {
            throw console.error(err);
        }
    }

    return(
        <Crud
            columns={columns}
            loadData={loadStudyTypes}
            onAddItem={addStudyType}
            onUpdateItem={updateStudyType}
            onDeleteItem={deleteStudyType}
            searchPlaceholder="Search study types..."
            form={(crudProps) => (
                <AsideCrudForm title="Study Type" isOpenState={crudProps.isFormOpen} editingObject={crudProps.editingObj} onClose={() => crudProps.toggleForm(null)} onUpdate={crudProps.onUpdate} onAdd={crudProps.onAdd}
                    children={(asideFormProps) => (
                        <StudyTypeForm formData={asideFormProps.formData} setFormData={asideFormProps.setFormData}/>
                    )}/>
            )}
        />
    );
}