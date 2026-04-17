import { Link } from "react-router-dom";
import { FcBiomass } from "react-icons/fc";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

export default function TopBarMenu() {
    return(
        <div className='flex flex-row bg-teal-900 text-white px-4 py-2 w-full'>
            <Link to="/" className="flex-row inline-flex text-4xl font-bold hover:text-gray-300 transition-colors duration-200 items-center gap-2">
                <FcBiomass size={44}/> 
                BioMatDB
            </Link>

            <button className="flex flex-row items-center gap-2 ml-auto hover:text-gray-300">
                <IoIosNotificationsOutline size={28}/>
                Notifications
            </button>

            <button className="flex flex-row items-center gap-2 mx-4 hover:text-gray-300">
                <CgProfile size={28}/>
                Profile
            </button>
        </div>
    )
}