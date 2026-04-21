import { useState } from "react";
import { FaBars, FaSearch, FaHome } from "react-icons/fa";
import AsideButton from "../AsideButton";
import { useNavigate } from "react-router";

export default function AsideMenu() {
    const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <aside className={`shrink-0 border-b border-teal-700 bg-teal-600 text-white transition-all duration-300 lg:border-b-0 lg:border-r ${isOpen ? "w-full lg:w-52" : "w-full lg:w-24"}`}>
          <div className="flex items-center justify-between gap-3 p-4 lg:flex-col lg:items-stretch">
            <AsideButton title={isOpen ? "Menu" : ""} Icon={FaBars} onClick={toggleMenu} isOpen={isOpen}/>
          </div>

          <ul className="flex flex-col gap-2 px-4 pb-4 lg:mt-6 lg:space-y-4 lg:px-4 lg:pb-4">
            {isOpen && <h2 className="hidden text-lg font-semibold lg:block">Opções</h2>}
            <li>
              <AsideButton title={"Home"} Icon={FaHome} isOpen={isOpen} onClick={
                () => navigate("/")
              }/>
            </li>
            <li>
                <AsideButton title={"Search"} Icon={FaSearch} isOpen={isOpen} onClick={
                    () => navigate("/search")
                }/>
            </li>
          </ul>
        </aside>
    );
}