import { useState } from "react";
import { FaBars, FaSearch, FaHome } from "react-icons/fa";
import AsideButton from "../AsideButton";
import { useNavigate } from "react-router";

export default function AsideMenu() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <aside className={`bg-teal-600 text-white h-full p-4 transition-all duration-300 ${ isOpen ? "w-52" : "w-24"}`}>
          <AsideButton title={isOpen ? "Menu" : ""} Icon={FaBars} onClick={toggleMenu} isOpen={isOpen}/>

          <ul className="space-y-4 mt-6">
            {isOpen && <h2 className="text-lg font-semibold">Opções</h2>}
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