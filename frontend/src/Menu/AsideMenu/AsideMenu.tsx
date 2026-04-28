import { FaBars } from "react-icons/fa";
import AsideButton from "./AsideButton";
import { Link, useLocation, useNavigate } from "react-router";
import { FcBiomass } from "react-icons/fc";
import { PAGES_INFO } from "../../Util/Pages/Paths";

export default function AsideMenu({ isSideBarOpen, toggleSideBar }: { isSideBarOpen: boolean, toggleSideBar: () => void }) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
      <>
        {isSideBarOpen && <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={toggleSideBar}/>}
        <aside className="border-b border-teal-700 bg-teal-600 text-white transition-all duration-300 z-50">
          {isSideBarOpen && (
            <div className="flex items-center justify-between p-4 lg:flex-col lg:items-stretch">
              <Link to="/" className="inline-flex items-center gap-2 font-bold transition-colors duration-200 hover:text-gray-300 sm:text-2xl lg:text-3xl">
                <FcBiomass size={36}/> 
                BioMatDB
            </Link>
          </div>)
          }

          <ul className="flex flex-col px-4 pb-4 lg:mt-6 lg:space-y-4 lg:px-4 lg:pb-4 mt-4">
            {!isSideBarOpen && (
              <li>
                <AsideButton title="Menu" Icon={FaBars} isOpen={isSideBarOpen} isActive={false} onClick={toggleSideBar} />
              </li>
            )}
            {PAGES_INFO.map((item) => (
              <li key={item.path}>
                <AsideButton title={item.name} Icon={item.icon} isOpen={isSideBarOpen} isActive={location.pathname === item.path} onClick={() => navigate(item.path)} />
              </li>
            ))}
          </ul>
        </aside>
      </>
    );
}