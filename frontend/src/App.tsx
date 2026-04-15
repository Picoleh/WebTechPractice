import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchComponent from "./Menu/SearchComponent"
import TopBarMenu from "./Menu/TopBarMenu/TopBarMenu"
import BioMaterialForm from "./Menu/BioMaterialForm";
import FooterBar from "./Menu/TopBarMenu/FooterBar";

function App() {

  return (
    <BrowserRouter>
    <div className="h-screen flex flex-col">
      <TopBarMenu/>

      <div className="flex justify-center items-start">

        <div className="bg-slate-400 flex justify-center w-11/12 h-auto p-8 my-12">

          <Routes>
            <Route path="/" element={<SearchComponent/>}/>
            <Route path="/add" element={<BioMaterialForm/>}/>
            <Route path="/edit/:id" element={<BioMaterialForm/>}/>
          </Routes>
        </div>
      </div>

      <FooterBar/>
    </div>
    </BrowserRouter>
  )
}

export default App
