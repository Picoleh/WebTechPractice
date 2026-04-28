import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchComponent from "./Menu/SearchComponent"
import TopBarMenu from "./Menu/TopBarMenu/TopBarMenu"
import AsideMenu from "./Menu/TopBarMenu/AsideMenu";
import PageTitle from "./Util/PageTitle";
import HomePage from "./Menu/HomePage";
import { useEffect, useState } from "react";
import { useMediaQuery } from "./DataManagement/MediaQuery";

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
            <Route path="/search" element={<SearchComponent/>}/>
            <Route path="/" element={<HomePage/>}/>
          </Routes>
        </div>
      </div>

      {/* <FooterBar/> */}
    </div>
    </BrowserRouter>
  )
}

export default App
