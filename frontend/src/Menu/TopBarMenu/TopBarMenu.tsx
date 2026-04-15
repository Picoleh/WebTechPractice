import { Link } from "react-router-dom";

export default function TopBarMenu() {
    return(
        <div className='bg-gray-800 text-white px-4 py-2'>
            <Link to="/">
                <h1 className='text-xl font-bold'>BioMaterials CRUD</h1>
            </Link>
        </div>
    )
}