import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchComponent from "./Pages/BioMaterials/SearchComponent"
import TopBarMenu from "./Menu/TopBarMenu"
import AsideMenu from "./Menu/AsideMenu/AsideMenu";
import PageTitle from "./Util/Pages/PageTitle";
import HomePage from "./Pages/Home/HomePage";
import { useEffect, useState } from "react";
import { useMediaQuery } from "./DataManagement/MediaQuery";
import BioMatType from "./Pages/BioMaterials/BioMaterialsType/BioMatType";
import StudyTypes from "./Pages/StudyTypes/StudyTypes";
import ResearchTech from "./Pages/ResearchTech/ResearchTech";
import Experiments from "./Pages/Experiments/Experiments";

function App() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [isSideBarOpen, setIsSideBarOpen] = useState(isDesktop);

  useEffect(() => {
    setIsSideBarOpen(isDesktop);
  }, [isDesktop]);

  const toggleSideBar = () => {
          setIsSideBarOpen(!isSideBarOpen);
  };


  return (
    <BrowserRouter>
    <div className="flex min-h-screen flex-row overflow-hidden bg-gray-100">
      <AsideMenu isSideBarOpen={isSideBarOpen} toggleSideBar={toggleSideBar}/>

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBarMenu/>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:m-8 lg:rounded-lg lg:bg-gray-100 lg:p-8 lg:shadow-[0_0_40px_rgba(0,0,0,0.15)]">
          <PageTitle/>
          <Routes>
            <Route path="/biomaterials" element={<SearchComponent/>}/>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/biomaterial_types" element={<BioMatType/>}/> 
            <Route path="/study_types" element={<StudyTypes/>}/>
            <Route path="/research_tech" element={<ResearchTech/>}/>
            <Route path="/experiments" element={<Experiments/>}/>
          </Routes>
        </div>
      </div>

      {/* <FooterBar/> */}
    </div>
    </BrowserRouter>
  )
}

export default App
