import { FaBiohazard, FaBook, FaHome } from "react-icons/fa";
import { MdMergeType } from "react-icons/md";

export const PAGES_INFO = [
    { name: "Home", path: "/" , icon: FaHome, title: "Home" },
    { name: "Biomaterials", path: "/search", icon: FaBiohazard, title: "BioMaterials Inventory" },
    { name: "Biomaterial Types", path: "/crud", icon: MdMergeType, title: "CRUD Operations" },
    { name: "Study Types", path: "/studyTypes", icon: FaBook, title: "Study Types" },
]