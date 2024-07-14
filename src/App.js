import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutTemplate from "~layout/template/LayoutTemplate";
import "~styles/global/global.scss";
import TemplateManagementPage from "./ui/page/template/management/TemplateManagementPage";
import CriteriaManagement from "./ui/page/criteria/criteria/management/CriteriaManagement";
import CriteriaGroupManagement from "./ui/page/criteria/criteriaGroup/management/CriteriaGroupManagement";
import SemesterManagement from "./ui/page/semester/management/SemesterManagement";
import FacultyManagement from "./ui/page/faculty/management/FacultyManagement";
import ClassManagement from "./ui/page/class/management/ClassManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutTemplate />}>
          <Route index element={<div>Home</div>} />
          <Route path="management">
            <Route path="template" element={<TemplateManagementPage />} />
            <Route path="criteria" element={<CriteriaManagement />} />
            <Route
              path="criteria-group"
              element={<CriteriaGroupManagement />}
            />
            <Route path="semester" element={<SemesterManagement />} />
            <Route path="faculty" element={<FacultyManagement />} />
            <Route path="class" element={<ClassManagement />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
