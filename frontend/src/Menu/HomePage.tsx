import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-5xl font-bold mb-4">Welcome to BioMatDB</h1>
            <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
                Explore a vast collection of biomaterials, their properties, and applications. Use the search bar to find the ideal material for your project or add new materials to our database.
            </p>
            <Link to="/search" className="bg-teal-500 hover:bg-teal-700 text-white px-6 py-3 rounded-lg text-lg">
                Go to Search
            </Link>
        </div>
    );
}