import { AiOutlineExperiment } from "react-icons/ai";
import ProjectSearchResult from "./ProjectSearchResult";
import { useEffect, useState } from "react";
import { fetchData } from "../../DataManagement/DataManager";
import type { ProjectSearchResultType } from "../../DataManagement/DataTypes";



export default function ProjectSearchResults({searchTerm}: {searchTerm: string}) {
    const [results, setResults] = useState<ProjectSearchResultType[]>([]);

    async function loadResults(searchTerm: string) {
        const response = await fetchData("project_search/?q=" + encodeURIComponent(searchTerm) + "&limit=-1");
        const data = response as ProjectSearchResultType[];
        setResults(data);
    }

    useEffect(() => {
        if (searchTerm.length > 2)
            loadResults(searchTerm);
        else
            setResults([]);
    }, [searchTerm]);

    return (
        <div className="bg-white w-full rounded-lg grid grid-cols-2 grid-rows-3 items-start gap-4 p-4">
            <div className="bg-gray-400 col-span-2">
                <ProjectSearchResult title="Experiments" content={results.filter(x => x.entity_type == "experiment")} icon={AiOutlineExperiment} />
            </div>
            <div className="bg-gray-400">
                <ProjectSearchResult title="Biomaterials" content={results.filter(x => x.entity_type == "biomaterial")} icon={AiOutlineExperiment} />
            </div>
            <div className="bg-gray-400">
                <ProjectSearchResult title="Bio Type" content={results.filter(x => x.entity_type == "biomaterial_type")} icon={AiOutlineExperiment} />
            </div>
            <div className="bg-gray-400">
                <ProjectSearchResult title="Research Technologies" content={results.filter(x => x.entity_type == "research_technology")} icon={AiOutlineExperiment} />
            </div>
            <div className="bg-gray-400">
                <ProjectSearchResult title="Study Types" content={results.filter(x => x.entity_type == "study_type")} icon={AiOutlineExperiment} />
            </div>
        </div>
    );
}