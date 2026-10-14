import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ParameterComparison from "../pages/ParameterComparison";
import ReportExport from "../pages/ReportExport";

// Business purpose: central route map of the module. When this module is integrated
// into a host application, these are the entry points to expose.
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/comparison" element={<ParameterComparison />} />
      <Route path="/export" element={<ReportExport />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
