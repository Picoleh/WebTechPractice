import { AiOutlineExperiment } from "react-icons/ai";
import ProjectSearchResult from "./ProjectSearchResult";
import { useEffect, useState } from "react";
import { fetchData } from "../../DataManagement/DataManager";
import type { ProjectSearchResultType } from "../../DataManagement/DataTypes";
import { FaBiohazard, FaBook } from "react-icons/fa";
import { GrTechnology } from "react-icons/gr";
import { MdMergeType } from "react-icons/md";



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
        <div className="bg-white w-full rounded-lg flex flex-col items-start gap-8 p-6">
            {searchTerm.length > 2 ? (
                <>
                    
                        <ProjectSearchResult title="Experiments" path="/experiments" content={results.filter(x => x.entity_type == "experiment")} searchTerm={searchTerm} icon={AiOutlineExperiment} />
                    
                    
                        <ProjectSearchResult title="Biomaterials" path="/biomaterials" content={results.filter(x => x.entity_type == "biomaterial")} searchTerm={searchTerm} icon={FaBiohazard} />
                    
                    
                        <ProjectSearchResult title="Bio Type" path="/biomaterial_types" content={results.filter(x => x.entity_type == "biomaterial_type")} searchTerm={searchTerm} icon={MdMergeType} />
                    
                    
                        <ProjectSearchResult title="Research Technologies" path="/research_tech" content={results.filter(x => x.entity_type == "research_technology")} searchTerm={searchTerm} icon={GrTechnology} />
                    
                    
                        <ProjectSearchResult title="Study Types" path="/study_types" content={results.filter(x => x.entity_type == "study_type")} searchTerm={searchTerm} icon={FaBook} />
                    
                </>
                ) : (
                <span className="text-gray-500">Please enter at least 3 characters to search.</span>
                 )
            }
        </div>
    );
}