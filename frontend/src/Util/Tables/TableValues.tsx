import { FaRegCalendarAlt } from "react-icons/fa";
import { FaCircleNodes } from "react-icons/fa6";
import ImageViewer from "../ImageViewer";

export default function TableValues({ keyProp, value }: { keyProp: string; value: string }) {
  if (keyProp === "biocompatibility" || keyProp === "level_evidence" || keyProp === "cost_level") {
    return (
      <td key={keyProp} className={`px-4 py-3 text-base flex flex-row align-center gap-4 text-gray-700 ${value === "High" ? "text-green-500" : value === "Moderate" ? "text-yellow-500" : "text-red-500"}`}>
        <FaCircleNodes size={28}/>
        {value}
      </td>
    );
  }
  else if (keyProp === "status") {
    return (
      <td key={keyProp} className={`px-4 py-3 text-base flex flex-row items-center align-center gap-4 text-gray-700 ${value === "Completed" ? "text-green-500" : value === "In Progress" ? "text-yellow-500" : "text-red-500"}`}>
        <FaRegCalendarAlt size={28}/>
        {value}
      </td>
    );
  }
  else if (keyProp === "img_path") {
    return (
      <td key={keyProp} className="px-4 py-3 text-base text-gray-700">
        <ImageViewer src={value} />
      </td>
    );
  }
  else{
    return (<td key={keyProp} className="px-4 py-3 text-base text-gray-700">
      {value}
    </td>
  );
  }
}