import { useEffect, useState } from "react";
import FilterDropdown from "../../Util/FilterDropdown";
import BioMatForm from "./BioMatForm";
import {fetchData} from "../../DataManagement/DataManager";
import type { Biomaterial, BiomaterialType } from "../../DataManagement/DataTypes";
import Crud from "../crud/Crud";
import { deleteBiomaterial } from "../../Util/Biomaterials/BioMaterialRemover";
import AsideCrudForm from "../../Util/Pages/AsideCrudForm";

const columns: Array<{ key: keyof Biomaterial; label: string }> = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "type_id", label: "Type" },
    { key: "description", label: "Description" },
    { key: "density", label: "Density" },
    { key: "biocompatibility", label: "Biocompatibility" },
    { key: "created_at", label: "Created At" },
];

export default function SearchComponent() {
    const [filterTypes, setFilterTypes] = useState<BiomaterialType[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<BiomaterialType[]>([]);

    function handleTypeFilterChange(type: BiomaterialType) {
        setSelectedTypes(prev => {
            if (prev.includes(type)) {  
                return prev.filter(t => t !== type);
            } else {
                return [...prev, type];
            }
        });
    }

    async function loadBiomaterials(searchTerm: string, page: number) {
        try {
            let fetch_path = `biomaterials?page=${page}`;
            if (searchTerm.trim() !== "") {
                fetch_path = `biomaterials/search?q=${encodeURIComponent(searchTerm)}&page=${page}`;
            }

            const typeParams = selectedTypes.map(type => `types=${encodeURIComponent(type.id.toString())}`).join("&");
            fetch_path += `&${typeParams}`;
            
            const responseJson = await fetchData(fetch_path);
            const result = responseJson.data as Biomaterial[];
            return {
                data: result,
                totalPages: Math.ceil(responseJson.meta.total / responseJson.meta.per_page),
            };
        } catch (err) {
            throw new Error("Unknown error while fetching data");
        }
    }

    async function addBiomaterial(obj: Biomaterial) {
        console.log("Adding biomaterial:", obj);
        try {
            const json = await fetchData("biomaterials", "POST", obj);

            alert("Biomaterial added with ID: " + json.data.id);
        }
        catch (err) {
            console.error("Unknown error while fetching data");
        }
    }

    async function updateBiomaterial(obj: Biomaterial) {
        console.log("Updating biomaterial:", obj);
        try {
            const json = await fetchData(`biomaterials/${obj?.id}`, "PUT", obj);
            
            alert("Biomaterial updated with ID: " + json.data.id);
        }
        catch (err) {
            console.error("Unknown error while fetching data");
        }
    }

    async function loadBiomaterialTypes() {
        try{
            const responseJson = await fetchData("biomaterials/types");
            const types = responseJson.data as BiomaterialType[];
            setFilterTypes(types);
        } catch (err) {
            throw new Error("Unknown error while fetching biomaterial types");
        }
    }

    useEffect(() => {
        loadBiomaterialTypes();
    }, []);

    return (
        <Crud
            columns={columns}
            loadData={loadBiomaterials}
            onAddItem={addBiomaterial}
            onDeleteItem={deleteBiomaterial}
            searchPlaceholder="Search biomaterials..."
            renderFilters={<FilterDropdown filterByTitle="Type" data={filterTypes} onTypeChange={handleTypeFilterChange} getLabel={(type) => type.name}/>}
            form={(crudProps) => (
                <AsideCrudForm isOpenState={crudProps.isFormOpen} editingObject={crudProps.editingObj} onClose={() => crudProps.toggleForm(null)} onUpdate={crudProps.onUpdate} onAdd={crudProps.onAdd}
                    children={(asideFormProps) => (
                        <BioMatForm formData={asideFormProps.formData} setFormData={asideFormProps.setFormData} biomaterialTypes={filterTypes}/>
                    )}>
                </AsideCrudForm>
            )}
        />
    );
}