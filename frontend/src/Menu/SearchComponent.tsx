import { useEffect, useState } from "react";
import { TableRender } from "../Util/TableRender";
import leftArrowIcon from "../assets/circle-arrow-indicator-left.svg";
import plusSign from "../assets/plusIcon.png";
import { Link } from "react-router-dom";

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
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    async function loadBiomaterials() {
        try {
            let fetch_path = `http://localhost:8000/biomaterials?page=${page}`;
            if (searchTerm.trim() !== "") {
                fetch_path = `http://localhost:8000/biomaterials/search?q=${encodeURIComponent(searchTerm)}&page=${page}`;
            }

            console.log(`Fetching biomaterials from: ${fetch_path}`);

            const response = await fetch(fetch_path);

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            
            const responseJson = await response.json();
            const result = responseJson.data as Biomaterial[];
            setData(result);
            setTotalPages(Math.ceil(responseJson.meta.total / responseJson.meta.per_page));
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
        <div className=" bg-gray-200 w-full p-5">
            <div className="flex flex-row justify-end mb-3 gap-4">
                <input
                    type="text"
                    placeholder="Search biomaterials..."
                    className="border border-gray-400 rounded px-3 py-2 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <button type="button" onClick={
                    async () => {
                        loadBiomaterials();
                    }
                    } className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded w-1/4">
                    Search
                </button>
                <div className="flex flex-row align-middle bg-orange-100 px-3">
                    <button onClick={() => setPage(page > 1 ? page - 1 : 1)} disabled={page === 1} className="text-white rounded hover:bg-gray-300 px-3 disabled:opacity-50 disabled:hover:bg-transparent">
                        <img src={leftArrowIcon} alt="Previous" className="w-20"/>
                    </button>
                    <p className="whitespace-nowrap content-center px-3">Page {page} of {totalPages}</p>
                    <button onClick={() => setPage(page < totalPages ? page + 1 : totalPages)} disabled={page === totalPages} className="text-white rounded hover:bg-gray-300 px-3 disabled:opacity-50 disabled:hover:bg-transparent">
                        <img src={leftArrowIcon} alt="Next" className="w-20 rotate-180"/>
                    </button>
                </div>

                <Link to="/add">
                    <button className="bg-green-500 hover:bg-green-700 text-white rounded h-full px-3">
                        <img src={plusSign} alt="Add" className="w-14"/>
                    </button>
                </Link>
            </div>

            {loading && <p>Loading biomaterials...</p>}
            {!loading && <TableRender data={data} columns={columns} onDeleteSucess={loadBiomaterials}/>}
        </div>
    );
}