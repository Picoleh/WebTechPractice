import { Link } from "react-router-dom";
import { FcBiomass } from "react-icons/fc";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

export default function TopBarMenu() {
    return(
        <div className='flex flex-col gap-3 bg-teal-900 px-4 py-3 text-white sm:flex-row sm:items-center sm:gap-4'>
            <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold transition-colors duration-200 hover:text-gray-300 sm:text-3xl lg:text-4xl">
                <FcBiomass size={36}/> 
                BioMatDB
            </Link>

            <button className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-teal-800 hover:text-gray-300 sm:ml-auto">
                <IoIosNotificationsOutline size={24}/>
                Notifications
            </button>

            <button className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-teal-800 hover:text-gray-300">
                <CgProfile size={24}/>
                Profile
            </button>
        </div>
    )
}