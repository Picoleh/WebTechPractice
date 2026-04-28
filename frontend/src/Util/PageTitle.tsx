import { useLocation } from "react-router-dom";
import { PAGES_INFO } from "./Paths";

function PageTitle() {
  const location = useLocation();

  const currentTitle = PAGES_INFO.find((page) => page.path === location.pathname)?.title ?? "Página";

  return <h1 className="text-4xl font-bold">{currentTitle}</h1>;
}

export default PageTitle;