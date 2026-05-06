import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";

export default function TopBarMenu() {
    return(
        <div className='flex flex-row bg-white px-8 py-3 gap-4'>
            <div className="mr-auto w-80 relative min-w-56">
                <FaSearch size={24} className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"/>
                <input type="text" placeholder="Search..." className="w-full rounded border border-gray-400 px-3 py-2 pl-8"/>
            </div>

            <button className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-200">
                <IoIosNotificationsOutline size={24}/>
                Notifications
            </button>

            <button className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-200">
                <CgProfile size={24}/>
                Profile
            </button>
        </div>
    )
}