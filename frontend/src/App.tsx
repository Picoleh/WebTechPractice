import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchComponent from "./Menu/SearchComponent"
import TopBarMenu from "./Menu/TopBarMenu/TopBarMenu"
import BioMaterialForm from "./Menu/BioMaterialForm";
import FooterBar from "./Menu/TopBarMenu/FooterBar";
import AsideMenu from "./Menu/TopBarMenu/AsideMenu";
import PageTitle from "./Util/PageTitle";

function App() {

  return (
    <BrowserRouter>
    <div className="h-screen flex flex-col">
      <TopBarMenu/>

      <div className="flex h-full">
        <AsideMenu/>

        <div className="bg-gray-100 flex-1 p-8 m-8 rounded-lg shadow-lg">
        <PageTitle/>
          <Routes>
            <Route path="/" element={<SearchComponent/>}/>
            <Route path="/add" element={<BioMaterialForm/>}/>
            <Route path="/edit/:id" element={<BioMaterialForm/>}/>
          </Routes>
        </div>
      </div>

      {/* s<FooterBar/> */}
    </div>
    </BrowserRouter>
  )
}

export default App
