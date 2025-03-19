import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import NotFound from "./pages/no-page";
import Dashboard from "./pages/dashboard";
import Interview from "./pages/home/interview";
import DashboardHome from "./pages/home/index";
import Candidate from "./pages/home/candidate";
import Session from "./pages/session";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="interviews" element={<Interview />} />
          <Route path="candidate" element={<Candidate />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/interview-session" element={<Session />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
