import { Link } from "react-router-dom";
import { deleteBiomaterial } from "./BioMaterialRemover";
import { GoPencil } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";

type Column<T> = {
  key: keyof T;
  label: string;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  onDeleteSucess: () => void;
  onEditClick: (id ?: number) => void;
};

export function TableRender<T extends { id: number }>({ data, columns, onDeleteSucess, onEditClick }: TableProps<T>) {
  return (
    <div className="bg-white rounded shadow-md overflow-hidden p-2">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            {columns.map(col => (
              <th key={String(col.key)} className="text-left px-6 py-4 text-xl font-semibold text-gray-600">{col.label}</th>
            ))}
            <th className="text-left px-6 py-4 text-xl font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b last:border-none hover:bg-gray-100 transition">
              {columns.map(col => (
                <td key={String(col.key)} className="p-3">
                  {String(row[col.key])}
                </td>
              ))}

              <td>
                  <button className="text-black px-2 py-1 rounded mr-2 hover:text-teal-500" onClick={() => onEditClick(row.id)}><GoPencil size={24}/></button>
                <button onClick={
                  async() => {
                    try{
                      await deleteBiomaterial(row.id);
                      onDeleteSucess();
                    }
                    catch(err){
                      console.error("Error deleting biomaterial:", err);
                    }
                  }
                } className="text-black px-2 py-1 rounded hover:text-red-500"><MdDeleteForever size={24}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}