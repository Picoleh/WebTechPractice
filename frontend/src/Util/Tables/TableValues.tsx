import { FaCircleNodes } from "react-icons/fa6";

export default function TableValues({ keyProp, value }: { keyProp: string; value: string }) {
  if (keyProp === "biocompatibility" || keyProp === "level_evidence") {
    return (
      <td key={keyProp} className={`px-4 py-3 text-base flex flex-row align-center gap-4 text-gray-700 ${value === "High" ? "text-green-500" : value === "Moderate" ? "text-yellow-500" : "text-red-500"}`}>
        <FaCircleNodes size={28}/>
        {value}
      </td>
    );
  }
  else{
    return (<td key={keyProp} className="px-4 py-3 align-top text-base text-gray-700">
      {value}
    </td>
  );
  }
}