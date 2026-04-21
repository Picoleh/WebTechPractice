import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchComponent from "./Menu/SearchComponent"
import TopBarMenu from "./Menu/TopBarMenu/TopBarMenu"
import AsideMenu from "./Menu/TopBarMenu/AsideMenu";
import PageTitle from "./Util/PageTitle";
import HomePage from "./Menu/HomePage";

function App() {

  return (
    <BrowserRouter>
    <div className="flex min-h-screen flex-col overflow-hidden bg-gray-100">
      <TopBarMenu/>

      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        <AsideMenu/>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:m-8 lg:rounded-lg lg:bg-gray-100 lg:p-8 lg:shadow-lg">
          <PageTitle/>
          <Routes>
            <Route path="/search" element={<SearchComponent/>}/>
            <Route path="/" element={<HomePage/>}/>
          </Routes>
        </div>
      </div>

      {/* s<FooterBar/> */}
    </div>
    </BrowserRouter>
  )
}

export default App
