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
            const responseJson = await fetchData("biomaterials/types");
            const result = responseJson as BiomaterialType[];

            return {
                data: result,
                totalPages: 1,
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