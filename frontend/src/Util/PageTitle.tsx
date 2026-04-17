import { useLocation } from "react-router-dom";

function PageTitle() {
  const location = useLocation();

  const titles : Record<string, string> = {
    "/": "Home",
    "/add": "Sobre",
    "/contato": "Contato",
  };

  const currentTitle = titles[location.pathname] ?? "Página";

  return <h1 className="text-4xl font-bold">{currentTitle}</h1>;
}

export default PageTitle;