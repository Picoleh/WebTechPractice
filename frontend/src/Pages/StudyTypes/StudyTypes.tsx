import { fetchData } from "../../DataManagement/DataManager";
import type { StudyType } from "../../DataManagement/DataTypes";
import Crud from "../crud/Crud";
import StudyTypeForm from "./StudyTypeForm";
import AsideCrudForm from "../../Util/Pages/AsideCrudForm";

const columns: Array<{ key: keyof StudyType; label: string }> = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "level_evidence", label: "Level of Evidence" },
    { key: "created_at", label: "Created At" },
];

export default function StudyTypes() {

    async function loadStudyTypes(searchTerm: string, page: number) {
        try {
            let fetch_path = `studyTypes?page=${page}`;
            if (searchTerm.trim() !== "") {
                fetch_path = `studyTypes/search?q=${encodeURIComponent(searchTerm)}&page=${page}`;
            }
            
            const responseJson = await fetchData(fetch_path);
            const result = responseJson.data as StudyType[];
            return {
                data: result,
                totalPages: Math.ceil(responseJson.meta.total / responseJson.meta.per_page),
            };
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