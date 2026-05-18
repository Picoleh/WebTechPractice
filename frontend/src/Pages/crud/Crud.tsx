import { FaPlus } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import Alert from "../../Util/Alert";
import { useAlert } from "../../Util/Hooks/useAlert";
import { useConfirmAlert } from "../../Util/Hooks/useConfirmAlert";
import ConfirmAlert from "../../Util/ConfirmAlert";
import {
    MaterialReactTable,
    MRT_GlobalFilterTextField,
    MRT_ToggleFiltersButton,
  useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_RowData,
} from 'material-react-table';
import { Box, IconButton, lighten } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

type CrudFormProps<T> = {
    isFormOpen: boolean;
    toggleForm: (obj: any | null) => void;
    editingObj: T | null;
    onUpdate: (item: T) => void;
    onAdd: (item: T) => void;
}

type CrudProps<T extends MRT_RowData> = {
    columns: MRT_ColumnDef<T>[];
    loadData: () => Promise<T[]>;
    onAddItem: (item: T) => Promise<void>;
    onUpdateItem: (item: T) => Promise<void>;
    onDeleteItem: (item: T) => Promise<void>;
    searchPlaceholder?: string;
    form: (props: CrudFormProps<T>) => React.ReactNode;
}

export default function Crud<T extends MRT_RowData>({ columns, loadData, onAddItem, onUpdateItem, onDeleteItem, searchPlaceholder = "Search...", form }: CrudProps<T>) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingObj, setEditingObj] = useState<T | null>(null);
    const loadDataRef = useRef(loadData);
    const { alert, showAlert, closeAlert } = useAlert();
    const { isConfirmOpen, confirmMessage, triggerId, openConfirm, handleConfirmResult } = useConfirmAlert();

    async function deleteData(item: T) {
        try {
            const confirmed = await openConfirm("Do you want to delete this item?");

            if (!confirmed) {
                return;
            }

            await onDeleteItem(item);
            await reloadData();
            showAlert("Item deleted successfully.", "success");
        } catch (err) {
            console.error("Error while deleting item:", err);
            showAlert("An error occurred while deleting the item.", "error");
        }
    }


    const table = useMaterialReactTable({
        columns,
        data,
        enableRowActions: true,
        positionActionsColumn: "last",
        enableGlobalFilter: true,
        positionGlobalFilter: 'none',
        enableColumnFilters: true,
        enableToolbarInternalActions: false,
        enableFullScreenToggle: false,
        enableDensityToggle: false,
        enableHiding: false,
        renderRowActions: ({ row }) => (
            <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton color="primary" onClick={() => toggleForm(row.original)}>
                    <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => void deleteData(row.original)}>
                    <Delete />
                </IconButton>
            </Box>
        ),
        renderTopToolbarCustomActions: ({ table}) => {
            return (
                <Box 
                    sx={(theme) => ({
                        backgroundColor: lighten(theme.palette.background.default, 0.05),
                        display: "flex",
                        flexDirection: "row",
                        gap: "1rem",
                        p: "0.5rem",
                        width: "100%",
                        justifyContent: "space-between",
                    })}>

                    <Box sx={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        <MRT_GlobalFilterTextField table={table} autoFocus placeholder={searchPlaceholder} />
                        <MRT_ToggleFiltersButton table={table} />
                    </Box>
                    <Box>
                        <button className="flex w-full items-center justify-center gap-2 rounded bg-teal-500 px-4 py-2 text-white hover:bg-teal-700 lg:w-auto" onClick={() => toggleForm(null)}>
                            <FaPlus size={28}/>
                            Add
                        </button>
                    </Box>
                </Box>
            );
        },
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 10,
            },
            showGlobalFilter: true,
        },
        state: {
            isLoading: loading,
        },
    });

    useEffect(() => {
        loadDataRef.current = loadData;
        reloadData();
    }, [loadData]);

    async function reloadData() {
        setLoading(true);

        try {
            const response = await loadDataRef.current();
            setData(response);
        } catch (err) {
            console.error("Error while loading data:", err);
        } finally {
            setLoading(false);
        }
    }

    async function addData(item: T) {
        try{
            await onAddItem(item);
            await reloadData();
            showAlert("Item added successfully.", "success");
        }
        catch(err){
            console.error("Error while adding item:", err);
            showAlert("An error occurred while adding the item.", "error");
        }
        finally{
            setEditingObj(null);
        }
    }

    async function updateData(item: T) {
        try{
            await onUpdateItem(item);
            await reloadData();
            showAlert("Item updated successfully.", "success");
        }
        catch(err){
            console.error("Error while updating item:", err);
            showAlert("An error occurred while updating the item.", "error");
        }
        finally{
            setEditingObj(null);
        }
    }

    function toggleForm(obj: T | null = null) {
        if(obj !== null){
            setEditingObj(obj);
        } else {
            setEditingObj(null);
        }

        if(isFormOpen){
            setEditingObj(null);
        }

        setIsFormOpen(prev => !prev);
    }

    return (
        <div className="mt-4 w-full sm:mt-8">
            <Alert message={alert.message} type={alert.type} isOpen={alert.isOpen} triggerId={alert.triggerId} onClose={closeAlert}/>
            <ConfirmAlert message={confirmMessage} isOpen={isConfirmOpen} triggerId={triggerId} onConfirm={handleConfirmResult}/>
        
                    <MaterialReactTable table={table}/>
        
                    {form({
                        isFormOpen,
                        toggleForm: (obj: T | null) => toggleForm(obj),
                        editingObj: editingObj,
                        onUpdate: updateData,
                        onAdd: addData
                    })}
                </div>
    );
}