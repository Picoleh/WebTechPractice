import { useEffect, useState } from "react";
import BioMatForm from "./BioMatForm";
import {fetchData, uploadImage} from "../../DataManagement/DataManager";
import type { Biomaterial, BiomaterialType } from "../../DataManagement/DataTypes";
import Crud from "../crud/Crud";
import AsideCrudForm from "../../Util/Pages/AsideCrudForm";
import type { MRT_ColumnDef } from "material-react-table";


const columns: MRT_ColumnDef<Biomaterial>[] = [    
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "type_id",
        header: "Type",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "density",
        header: "Density (g/cm³)",
    },
    {
        accessorKey: "biocompatibility",
        header: "Biocompatibility",
    },
    {
        accessorKey: "created_at",
        header: "Created At",
    }
];

export default function SearchComponent() {
    const [filterTypes, setFilterTypes] = useState<BiomaterialType[]>([]);

    async function loadBiomaterials(searchTerm: string) {
        try {
            let fetch_path = `biomaterials/`;
            if (searchTerm.trim() !== "") {
                fetch_path = `biomaterials/search?q=${encodeURIComponent(searchTerm)}`;
            }
            const responseJson = await fetchData(fetch_path);
            const result = responseJson as Biomaterial[];
            return result;
        } catch (err) {
            throw new Error("Unknown error while fetching data");
        }
    }

    async function addBiomaterial(obj: Biomaterial) {
        console.log("Adding biomaterial:", obj);

        try {
            if (obj.image !== undefined){
                const imgPath = await uploadImage(obj.image as File);
                obj.img_path = imgPath;   
                delete obj.image;
            }
            await fetchData("biomaterials", "POST", obj);
        }
        catch (err) {
            console.error(err);
        }
    }

    async function updateBiomaterial(obj: Biomaterial) {
        console.log("Updating biomaterial:", obj);
        try {
            if (obj.image !== undefined){
                const imgPath = await uploadImage(obj.image as File);
                obj.img_path = imgPath;   
                delete obj.image;
            }
            
            await fetchData(`biomaterials/${obj.id}`, "PUT", obj);
            
        }
        catch (err) {
            console.error("Unknown error while fetching data");
        }
    }

    async function loadBiomaterialTypes() {
        try{
            const responseJson = await fetchData("biomaterials/types");
            const types = responseJson as BiomaterialType[];
            setFilterTypes(types);
        } catch (err) {
            throw new Error("Unknown error while fetching biomaterial types");
        }
    }

    async function deleteBiomaterial(bioMat: Biomaterial) {
        try{
            const json = await fetchData(`biomaterials/${bioMat.id}`, "DELETE");
            return json;
        }
        catch (err) {
            throw new Error("Erro ao deletar biomaterial");
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
            onUpdateItem={updateBiomaterial}
            onDeleteItem={deleteBiomaterial}
            searchPlaceholder="Search biomaterials..."
            form={(crudProps) => (
                <AsideCrudForm title="Biomaterial" isOpenState={crudProps.isFormOpen} editingObject={crudProps.editingObj} onClose={() => crudProps.toggleForm(null)} onUpdate={crudProps.onUpdate} onAdd={crudProps.onAdd}
                    children={(asideFormProps) => (
                        <BioMatForm formData={asideFormProps.formData} setFormData={asideFormProps.setFormData} biomaterialTypes={filterTypes}/>
                    )}/>
            )}
        />
    );
}