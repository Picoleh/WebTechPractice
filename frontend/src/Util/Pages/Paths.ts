import { AiOutlineExperiment } from "react-icons/ai";
import { FaBiohazard, FaBook, FaHome } from "react-icons/fa";
import { GrTechnology } from "react-icons/gr";
import { MdMergeType } from "react-icons/md";

export const PAGES_INFO = [
    { name: "Home", path: "/" , icon: FaHome, title: "Home" },
    { name: "Biomaterials", path: "/biomaterials", icon: FaBiohazard, title: "BioMaterials Inventory" },
    { name: "Biomaterial Types", path: "/biomaterialTypes", icon: MdMergeType, title: "Biomaterial Types" },
    { name: "Study Types", path: "/studyTypes", icon: FaBook, title: "Study Types" },
    { name: "Research Technologies", path: "/researchTech", icon: GrTechnology, title: "Research Technologies" },
    { name: "Experiments", path: "/experiments", icon: AiOutlineExperiment, title: "Experiments" },
]