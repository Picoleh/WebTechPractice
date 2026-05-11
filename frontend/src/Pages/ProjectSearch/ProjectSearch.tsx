import { TbVirusSearch } from "react-icons/tb";
import ProjectSearchResults from "./ProjectSearchResults";
import { useState } from "react";

export default function ProjectSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="flex flex-col gap-12 mt-8 w-full">
        <div className="flex flex-row border-2 border-teal-500 bg-teal-500 rounded-lg">
            <TbVirusSearch size={64} className=" p-2 rounded-lg text-white"/>
            <input type="text" placeholder="Search across all data" onChange={(e) => setSearchTerm(e.target.value)}  className=" flex-1 rounded-lg p-4 text-2xl"/>
        </div>

        <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold">Dynamic Search Results</h1>

            <ProjectSearchResults searchTerm={searchTerm} />
        </div>
    </div>
  );
}