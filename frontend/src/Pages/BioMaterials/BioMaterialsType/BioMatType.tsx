import { fetchData } from "../../../DataManagement/DataManager";
import type { BiomaterialType } from "../../../DataManagement/DataTypes";
import Crud from "../../crud/Crud";
import AsideCrudForm from "../../../Util/Pages/AsideCrudForm";
import BioMatTypesForm from "./BioMatTypesForm";

const columns: Array<{ key: keyof BiomaterialType; label: string }> = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "created_at", label: "Created At" },
];

export default function BioMatType() {

    async function loadTypes(searchTerm: string, _page: number) {
        try {
            let fetch_path = `biomaterials/types?page=${_page}`;
            if (searchTerm.trim() !== "") {
                fetch_path = `biomaterials/types/search?q=${encodeURIComponent(searchTerm)}&page=${_page}`;
            }
            const responseJson = await fetchData(fetch_path);
            const result = responseJson.data as BiomaterialType[];

            return {
                data: result,
                totalPages: Math.ceil(responseJson.meta.total / responseJson.meta.per_page),
            };
        } catch (err) {
            throw new Error("Unknown error while fetching biomaterial types");
        }
    }

    async function addType(obj: BiomaterialType) {
        try {
            await fetchData("biomaterials/types", "POST", obj);
        } catch (err) {
            throw new Error("Unknown error while adding biomaterial type");
        }
    }

    async function updateType(obj: BiomaterialType) {
        try {
            await fetchData(`biomaterials/types/${obj.id}`, "PUT", obj);
        } catch (err) {
            throw new Error("Unknown error while updating biomaterial type");
        }
    }

    async function deleteType(obj: BiomaterialType) {
        try {
            await fetchData(`biomaterials/types/${obj.id}`, "DELETE");
        } catch (err) {
            throw new Error("Unknown error while deleting biomaterial type");
        }
    }

    return (
        <Crud
            columns={columns}
            loadData={loadTypes}
            onAddItem={addType}
            onUpdateItem={updateType}
            onDeleteItem={deleteType}
            searchPlaceholder="Search biomaterial types..."
            form={(crudProps) => (
                <AsideCrudForm  title="Biomaterial Type" isOpenState={crudProps.isFormOpen} editingObject={crudProps.editingObj} onClose={() => crudProps.toggleForm(null)} onUpdate={crudProps.onUpdate} onAdd={crudProps.onAdd}
                children={(asideFormProps) => (
                    <BioMatTypesForm formData={asideFormProps.formData} setFormData={asideFormProps.setFormData} />
                )}>
                </AsideCrudForm>
            )}
        />
    );
}