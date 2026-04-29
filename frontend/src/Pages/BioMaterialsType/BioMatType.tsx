import type { ReactNode } from "react";
import { fetchData } from "../../DataManagement/DataManager";
import type { BiomaterialType } from "../../DataManagement/DataTypes";
import Crud from "../../Pages/crud/Crud";

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

    return (
        <Crud
            columns={columns}
            loadData={loadTypes}
            onDeleteItem={async () => {}}
            searchPlaceholder="Search biomaterial types..."
            form={(): ReactNode => null}
        />
    );
}