import { Link } from "react-router-dom";
import { deleteBiomaterial } from "./BioMaterialRemover";

type Column<T> = {
  key: keyof T;
  label: string;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  onDeleteSucess: () => void;
};

export function TableRender<T extends { id: number }>({ data, columns, onDeleteSucess }: TableProps<T>) {
  return (
    <table className="w-full">
      <thead>
        <tr>
          {columns.map(col => (
            <th key={String(col.key)}>{col.label}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-solid border-black border-2 hover:bg-gray-300 text-center">
            {columns.map(col => (
              <td key={String(col.key)} className="p-3">
                {String(row[col.key])}
              </td>
            ))}

            <td>
              <Link to={`/edit/${row.id}`} state={{ biomaterial: row }}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded mr-2">Edit</button>
              </Link>
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
              } className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}