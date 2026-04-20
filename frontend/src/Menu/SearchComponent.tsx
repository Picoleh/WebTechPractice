import { useEffect, useState } from "react";
import { TableRender } from "../Util/TableRender";
import PageCounter from "../Util/PageCounter";
import { FaPlus } from "react-icons/fa6";
import FilterDropdown from "../Util/FilterDropdown";
import BioMatForm from "./BioMatForm";


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
            let fetch_path = `http://localhost:8000/biomaterials?page=${page}`;
            if (searchTerm.trim() !== "") {
                fetch_path = `http://localhost:8000/biomaterials/search?q=${encodeURIComponent(searchTerm)}&page=${page}`;
            }

            const typeParams = selectedTypes.map(type => `types=${encodeURIComponent(type)}`).join("&");
            fetch_path += `&${typeParams}`;

            console.log(`Fetching biomaterials from: ${fetch_path}`);

            const response = await fetch(fetch_path);

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            
            const responseJson = await response.json();
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
        <div className="w-full mt-8">
            <div className="bg-white flex flex-row justify-end mb-3 gap-4 p-2 rounded shadow-lg">
                <input
                    type="text"
                    placeholder="Search biomaterials..."
                    className="border border-gray-400 rounded px-3 py-2 w-1/5 mr-auto"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <FilterDropdown filterByTitle="Type" data={filterTypes} onTypeChange={handleTypeFilterChange}/>

                <button type="button" onClick={
                    async () => {
                        loadBiomaterials();
                    }
                    } className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded w-1/12">
                    Search
                </button>

                <button className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 rounded flex flex-row items-center justify-center gap-2" onClick={() => toggleForm()}>
                    <FaPlus size={28}/>
                    Add
                </button>
                
            </div>

            {loading && <p>Loading biomaterials...</p>}
            {!loading && <TableRender data={data} columns={columns} onDeleteSucess={loadBiomaterials} onEditClick={toggleForm}/>}
            <div className="bg-white mt-3 p-2 rounded shadow-lg" >
                <PageCounter page={page} totalPages={totalPages} onPageChange={(newPage) => setPage(newPage)}/>
            </div>

            <BioMatForm isOpenState={isFormOpen} onClose={toggleForm} editingId={editingId} onUpdate={loadBiomaterials}/>
        </div>
    );
}