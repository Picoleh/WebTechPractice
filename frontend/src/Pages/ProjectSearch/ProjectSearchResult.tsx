import type { IconType } from "react-icons";
import type { ProjectSearchResultType } from "../../DataManagement/DataTypes";
import { Link } from "react-router-dom";

export default function ProjectSearchResult({title, content, searchTerm, path, icon}: {title: string, content: ProjectSearchResultType[], searchTerm: string, path: string, icon: IconType}) {
    
    function highlightSearchTerm(text: string) {

        let words = text.toLowerCase().split(" ");
        let index = words.findIndex(x => x.includes(searchTerm.toLowerCase()));

        if (index != -1){
            return(
                <span>
                    {index > 0 && "..." + words[index-1] + " "}
                    <b>{words[index]}</b>
                    {index < words.length - 1 && " " + words[index+1] + "..."}
                </span>
            );
        }
        return (
            <span>
                {searchTerm}
            </span>
        );
    }
    
    return (
        content.length > 0 && (
        <div className="flex flex-col justify-center gap-4">
            <div className="flex flex-row gap-2">
                {icon({size: 32, className: ""})}
                <h1 className="text-2xl font-semibold">{title}</h1>
            </div>

            <div className="flex flex-row gap-8 justify-start flex-wrap">

                {content.map((result, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        <Link to={path} className="text-lg text-blue-600 underline hover:text-blue-800">
                            {result.title}
                        </Link>
                        <span className="text-gray-500">{(highlightSearchTerm(result.content))}</span>
                    </div>
                ))}
            </div>
        </div>
        )
    );
}