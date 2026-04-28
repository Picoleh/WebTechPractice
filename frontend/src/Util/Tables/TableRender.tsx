import { deleteBiomaterial } from "../Biomaterials/BioMaterialRemover";
import { GoPencil } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import TableValues from "./TableValues";

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
    <div className="overflow-x-auto rounded bg-white shadow-md">
      <table className="min-w-[760px] w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            {columns.map(col => (
              <th key={String(col.key)} className="px-4 py-4 text-left text-lg font-bold uppercase tracking-wide text-gray-600">
                {col.label}
              </th>
            ))}
            <th className="px-4 py-4 text-left text-lg font-bold uppercase tracking-wide text-gray-600">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b last:border-none hover:bg-gray-100 transition">
              {columns.map(col => (
                  <TableValues keyProp={String(col.key)} value={String(row[col.key])} />
              ))}

              <td className="px-4 py-3 whitespace-nowrap">
                  <button className="mr-2 rounded px-2 py-1 text-black hover:text-teal-500" onClick={() => onEditClick(row.id)}><GoPencil size={28}/></button>
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
                } className="rounded px-2 py-1 text-black hover:text-red-500"><MdDeleteForever size={28}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}