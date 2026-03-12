import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Companies from "../pages/Companies";
import CompanyDetail from "../pages/CompanyDetail";
import ActivityLogs from "../pages/ActivityLogs";
import RegisterUser from "../pages/RegisterUser";
import RegisterOrganization from "../pages/RegisterOrganization";
import PrivateRoute from "./PrivateRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/register-user"
          element={
            <PrivateRoute>
              <RegisterUser />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/companies"
          element={
            <PrivateRoute>
              <Companies />
            </PrivateRoute>
          }
        />

        <Route
          path="/companies/:id"
          element={
            <PrivateRoute>
              <CompanyDetail />
            </PrivateRoute>
          }
        />

        <Route
          path="/activity-logs"
          element={
            <PrivateRoute>
              <ActivityLogs />
            </PrivateRoute>
          }
        />

        <Route
          path="/register-organization"
          element={
            <PrivateRoute>
              <RegisterOrganization />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;