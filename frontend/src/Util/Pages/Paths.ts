import { AiOutlineExperiment } from "react-icons/ai";
import { FaBiohazard, FaBook, FaHome, FaProjectDiagram } from "react-icons/fa";
import { GrTechnology } from "react-icons/gr";
import { MdMergeType } from "react-icons/md";

export const PAGES_INFO = [
    { name: "Home", path: "/" , icon: FaHome, title: "Home" },
    { name: "Biomaterials", path: "/biomaterials", icon: FaBiohazard, title: "BioMaterials Inventory" },
    { name: "Biomaterial Types", path: "/biomaterial_types", icon: MdMergeType, title: "Biomaterial Types" },
    { name: "Study Types", path: "/study_types", icon: FaBook, title: "Study Types" },
    { name: "Research Technologies", path: "/research_tech", icon: GrTechnology, title: "Research Technologies" },
    { name: "Experiments", path: "/experiments", icon: AiOutlineExperiment, title: "Experiments" },
    { name: "Project Search", path: "/project_search", icon: FaProjectDiagram, title: "Project Search" },
]