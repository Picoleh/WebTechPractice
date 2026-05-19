import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchComponent from "./Pages/BioMaterials/SearchComponent"
import HomePage from "./Pages/Home/HomePage";
import BioMatType from "./Pages/BioMaterials/BioMaterialsType/BioMatType";
import StudyTypes from "./Pages/StudyTypes/StudyTypes";
import ResearchTech from "./Pages/ResearchTech/ResearchTech";
import Experiments from "./Pages/Experiments/Experiments";
import ProjectSearch from "./Pages/ProjectSearch/ProjectSearch";
import PrivateLayout from "./Layouts/PrivateLayout";
import PublicLayout from "./Layouts/PublicLayout";
import PrivateRoute from "./Auth/PrivateRoute";
import Login from "./Menu/Login";

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route>
          <Route element={<PublicLayout/>}>
            <Route path="/login" element={<Login/>}/>
          </Route>
        </Route>

        <Route element={<PrivateRoute/>}>
          <Route element={<PrivateLayout/>}>
            <Route path="/biomaterials" element={<SearchComponent/>}/>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/biomaterial_types" element={<BioMatType/>}/> 
            <Route path="/study_types" element={<StudyTypes/>}/>
            <Route path="/research_tech" element={<ResearchTech/>}/>
            <Route path="/experiments" element={<Experiments/>}/>
            <Route path="/project_search" element={<ProjectSearch/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
