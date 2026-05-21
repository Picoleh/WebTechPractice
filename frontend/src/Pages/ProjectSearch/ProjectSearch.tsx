import { TbVirusSearch } from "react-icons/tb";
import ProjectSearchResults from "./ProjectSearchResults";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function ProjectSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="flex flex-col gap-12 mt-8 w-full">
        <div className="flex flex-row border-2 border-[var(--primary-color-bright)] bg-[var(--primary-color-bright)] rounded-lg relative">
            <TbVirusSearch size={64} className=" p-2 rounded-lg text-[var(--text-color)]"/>
            <input type="text" placeholder="Search across all data" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} className=" flex-1 rounded-lg p-4 text-2xl bg-[var(--primary-color)] text-[var(--text-color)]"/>
            <button onClick={() => setSearchTerm("")} className="ml-auto px-2 py-1 rounded hover:bg-[var(--primary-color-hover)] text-[var(--text-color)] absolute right-2 top-4">
              <IoMdClose size={28}/>
            </button>
        </div>

        <div className="flex flex-col gap-2">
            <h1 className="text-xl font-bold text-[var(--text-color)]">Dynamic Search Results</h1>

            <ProjectSearchResults searchTerm={searchTerm} />
        </div>
    </div>
  );
}