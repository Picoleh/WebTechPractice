import { GoPencil } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import TableValues from "./TableValues";
import type { TableProps } from "../../DataManagement/DataTypes";

export function TableRender<T>({ data, columns, onDeleteClick, onEditClick }: TableProps<T>) {
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
                  <TableValues key={String(col.key)} keyProp={String(col.key)} value={String(row[col.key])} />
              ))}

              <td className="px-4 py-3 whitespace-nowrap">
                <button className="mr-2 rounded px-2 py-1 text-black hover:text-teal-500" onClick={() => onEditClick(row)}><GoPencil size={28}/></button>
                <button onClick={
                  async() => {
                    try{
                      await onDeleteClick(row);
                    }
                    catch(err){
                      console.error("Error deleting item:", err);
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