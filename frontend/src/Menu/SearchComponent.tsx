import { useEffect, useState } from "react";
import { TableRender } from "../Util/TableRender";
import PageCounter from "../Util/PageCounter";
import { FaPlus } from "react-icons/fa6";
import FilterDropdown from "../Util/FilterDropdown";
import BioMatForm from "./BioMatForm";
import {fetchData} from "../DataManagement/DataManager";
import { FaSearch } from "react-icons/fa";


export type Biomaterial = {
    id: number;
    name: string;
    type: string;
    description: string;
    density: number | null;
    biocompatibility: string;
    created_at: string | null;
};

const columns: Array<{ key: keyof Biomaterial; label: string }> = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "type", label: "Type" },
    { key: "description", label: "Description" },
    { key: "density", label: "Density" },
    { key: "biocompatibility", label: "Biocompatibility" },
    { key: "created_at", label: "Created At" },
];

export default function SearchComponent() {
    const [data, setData] = useState<Biomaterial[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filterTypes, setFilterTypes] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    function toggleForm(id?: number) {
        if(id !== undefined){
            setEditingId(id);
        } else {
            setEditingId(null);
        }
        setIsFormOpen(prev => !prev);
    }

    function handleTypeFilterChange(type: string) {
        setSelectedTypes(prev => {
            if (prev.includes(type)) {  
                return prev.filter(t => t !== type);
            } else {
                return [...prev, type];
            }
        });
    }

    async function loadBiomaterials() {
        try {
            let fetch_path = `biomaterials?page=${page}`;
            if (searchTerm.trim() !== "") {
                fetch_path = `biomaterials/search?q=${encodeURIComponent(searchTerm)}&page=${page}`;
            }

            const typeParams = selectedTypes.map(type => `types=${encodeURIComponent(type)}`).join("&");
            fetch_path += `&${typeParams}`;
            
            const responseJson = await fetchData(fetch_path);
            const result = responseJson.data as Biomaterial[];
            setData(result);
            setTotalPages(Math.ceil(responseJson.meta.total / responseJson.meta.per_page));
            setFilterTypes(responseJson.meta.types || []);
        } catch (err) {
            throw new Error("Unknown error while fetching data");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadBiomaterials();
    }, [page]);

    return (
        <div className="mt-4 w-full sm:mt-8">
            <div className="mb-3 flex flex-col gap-3 rounded bg-white p-3 shadow-lg sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
                <input
                    type="text"
                    placeholder="Search biomaterials..."
                    className="w-full rounded border border-gray-400 px-3 py-2 sm:min-w-[220px] sm:flex-1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <FilterDropdown filterByTitle="Type" data={filterTypes} onTypeChange={handleTypeFilterChange}/>

                <button type="button" onClick={
                    async () => {
                        loadBiomaterials();
                    }
                    } className="w-full flex gap-2 items-center justify-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 sm:w-auto">
                    <FaSearch size={28}/>
                    Search
                </button>

                <button className="flex w-full items-center justify-center gap-2 rounded bg-teal-500 px-4 py-2 text-white hover:bg-teal-700 sm:w-auto" onClick={() => toggleForm()}>
                    <FaPlus size={28}/>
                    Add
                </button>
                
            </div>

            {loading && <p>Loading biomaterials...</p>}
            {!loading && <TableRender data={data} columns={columns} onDeleteSucess={loadBiomaterials} onEditClick={toggleForm}/>}
            <div className="mt-3 rounded bg-white p-2 shadow-lg" >
                <PageCounter page={page} totalPages={totalPages} onPageChange={(newPage) => setPage(newPage)}/>
            </div>

            <BioMatForm isOpenState={isFormOpen} onClose={toggleForm} editingId={editingId} onUpdate={loadBiomaterials}/>
        </div>
    );
}