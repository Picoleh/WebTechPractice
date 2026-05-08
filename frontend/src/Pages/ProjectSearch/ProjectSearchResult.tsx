import type { IconType } from "react-icons";
import type { ProjectSearchResultType } from "../../DataManagement/DataTypes";

export default function ProjectSearchResult({title, content, icon}: {title: string, content: ProjectSearchResultType[], icon: IconType}) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row">
                {icon({size: 32, className: ""})}
                <h1 className="text-lg font-semibold">{title}</h1>
            </div>
            {content.map((result, index) => (
                <p key={index} className="text-sm text-gray-500">{result.title}</p>
            ))}
        </div>
    );
}