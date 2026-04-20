import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-5xl font-bold mb-4">Bem-vindo ao BioMatDB</h1>
            <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
                Explore uma vasta coleção de biomateriais, suas propriedades e aplicações. Use a barra de pesquisa para encontrar o material ideal para seu projeto ou adicione novos materiais à nossa base de dados.
            </p>
            <Link to="/search" className="bg-teal-500 hover:bg-teal-700 text-white px-6 py-3 rounded-lg text-lg">
                Ir para a pesquisa
            </Link>
        </div>
    );
}