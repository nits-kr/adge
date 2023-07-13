import "./App.css";
import 'typeface-roboto';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLogin from "./components/login/UserLogin";
import Home from "./components/home/Home";
import DashboardUser from "./components/dashboardUser/DashboardUser";
import DasboardReviewer from "./components/dashboardReviewer/DasboardReviewer";
import AuditorQuestions from "./components/auditorQuestion/AuditorQuestions";
import AdgeQuestions from "./components/adgeQustion/AdgeQuestions";
import Header from "./components/Header";
import AuditReport from "./report/AuditReport";
import Certificate from "./components/Certficate";
import ActionPlan from "./components/ActionPlan";
import History from "./components/History";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            className="active"
            path="/adge"
            element={<UserLogin />}
          />
          <Route  className="active" path="/adge/home" element={<Home />} />
          <Route
            
            className="active"
            path="/adge/dashboard"
            element={<DashboardUser />}
          />
          <Route
            
            className="active"
            path="/adge/dashboard-reviewer"
            element={<DasboardReviewer />}
          />
          <Route
            
            className="active"
            path="/adge/auditior-question/:id"
            element={<AuditorQuestions />}
          />
          <Route
            
            className="active"
            path="/adge/adge-question"
            element={<AdgeQuestions />}
          />
          <Route
            
            className="active"
            path="/adge/header"
            element={<Header/>}
          />
          <Route
            
            className="active"
            path="/adge/audit-report"
            element={<AuditReport/>}
          />
          <Route
            
            className="active"
            path="/certificate"
            element={<Certificate/>}
          />
          <Route
            
            className="active"
            path="/action"
            element={<ActionPlan/>}
          />
          <Route
            
            className="active"
            path="/history"
            element={<History/>}
          />          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
