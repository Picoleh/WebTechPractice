import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function PageCounter({ page, totalPages, onPageChange }: { page: number; totalPages: number; onPageChange: (newPage: number) => void }) {
    return (
        <div className="flex flex-row items-center justify-center gap-3 lg:justify-end">
            <button onClick={() => onPageChange(page > 1 ? page - 1 : 1)} disabled={page === 1} 
                className="lg:order-1 border border-gray-400 rounded shadow-lg p-2 text-black hover:text-teal-600 hover:border-teal-600 disabled:opacity-50 disabled:hover:border-gray-400">
                <IoIosArrowBack size={20}/>
            </button>
            <p className="whitespace-nowrap px-3 text-center sm:text-left">Page {page} of {totalPages}</p>
            <button onClick={() => onPageChange(page < totalPages ? page + 1 : totalPages)} disabled={page === totalPages} 
                className="lg:order-2 border border-gray-400 rounded shadow-lg p-2 text-black hover:text-teal-600 hover:border-teal-600 disabled:opacity-50 disabled:hover:border-gray-400">
                <IoIosArrowForward size={20}/>
            </button>
        </div>
    );
}