import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import PageCounter from "../../Util/Pages/PageCounter";
import { TableRender } from "../../Util/Tables/TableRender";
import { useEffect, useRef, useState } from "react";
import type { Column } from "../../DataManagement/DataTypes";

type CrudFormProps<T> = {
    isFormOpen: boolean;
    toggleForm: (obj: any | null) => void;
    editingObj: T | null;
    onUpdate: () => Promise<void> | void;
}

type CrudLoadResult<T> = {
    data: T[];
    totalPages: number;
};

type CrudProps<T> = {
    columns: Column<T>[];
    loadData: (searchTerm: string, page: number) => Promise<CrudLoadResult<T>>;
    onDeleteItem: (item: T) => Promise<void>;
    renderFilters?: React.ReactNode;
    searchPlaceholder?: string;
    form: (props: CrudFormProps<T>) => React.ReactNode;
}

export default function Crud<T>({ columns, loadData, onDeleteItem, renderFilters, searchPlaceholder = "Search...", form }: CrudProps<T>) {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [data, setData] = useState<T[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingObj, setEditingObj] = useState<T | null>(null);
    const loadDataRef = useRef(loadData);

    useEffect(() => {
        loadDataRef.current = loadData;
    }, [loadData]);

    async function reloadData() {
        setLoading(true);

        try {
            const response = await loadDataRef.current(searchTerm, page);
            setData(response.data);
            setTotalPages(response.totalPages);
        } catch (err) {
            console.error("Error while loading data:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        void reloadData();
    }, [page]);

    function toggleForm(obj: T | null = null) {
        if(obj !== null){
            setEditingObj(obj);
        } else {
            setEditingObj(null);
        }
        setIsFormOpen(prev => !prev);
    }

    return (
        <div className="mt-4 w-full sm:mt-8">
                    <div className="mb-3 flex flex-col gap-3 rounded bg-white p-3 shadow-lg lg:flex-row lg:items-center lg:justify-end">
                        
                        <div className="mr-auto w-full lg:w-80 relative min-w-56">
                            <FaSearch size={24} className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"/>
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                className="mr-auto w-full rounded border border-gray-400 px-3 py-2 pl-8 sm:min-w-[220px]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
        
                        {renderFilters}
        
                        <button type="button" onClick={
                            async () => {
                                await reloadData();
                            }
                            } className="w-full flex gap-2 items-center justify-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 lg:w-auto">
                            <FaSearch size={28}/>
                            Search
                        </button>
        
                        <button className="flex w-full items-center justify-center gap-2 rounded bg-teal-500 px-4 py-2 text-white hover:bg-teal-700 lg:w-auto" onClick={() => toggleForm(null)}>
                            <FaPlus size={28}/>
                            Add
                        </button>
                        
                    </div>
        
                    {!loading && <TableRender data={data} columns={columns} onDeleteClick={async (item) => {
                        await onDeleteItem(item);
                        await reloadData();
                    }} onEditClick={(item) => toggleForm(item)} />}
                    <div className="mt-3 rounded bg-white p-2 shadow-lg" >
                        <PageCounter page={page} totalPages={totalPages} onPageChange={(newPage) => setPage(newPage)}/>
                    </div>
        
                    {form({
                        isFormOpen,
                        toggleForm: (obj: T | null) => toggleForm(obj),
                        editingObj,
                        onUpdate: reloadData
                    })}
                </div>
    );
}