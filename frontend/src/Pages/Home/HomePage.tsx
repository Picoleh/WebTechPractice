import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-8 text-center sm:px-6 lg:px-8">
            <h1 className="mb-4 text-3xl font-bold sm:text-5xl">Welcome to BioMatDB</h1>
            <p className="mb-8 max-w-xl text-base text-gray-600 sm:text-lg">
                Explore a vast collection of biomaterials, their properties, and applications. Use the search bar to find the ideal material for your project or add new materials to our database.
            </p>
            <Link to="/biomaterials" className="w-full max-w-sm rounded-lg bg-teal-500 px-6 py-3 text-lg text-white hover:bg-teal-700 sm:w-auto">
                Go to Search
            </Link>
        </div>
    );
}