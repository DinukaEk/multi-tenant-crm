import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Activity,
  UserPlus,
  Building,
} from "lucide-react";
import "./layout.css";

function Sidebar() {

  const role = localStorage.getItem("role");

  return (

    <div className="sidebar">

      <div className="sidebar-logo">
        CRM
      </div>

      <nav className="sidebar-nav">

        <NavLink to="/dashboard" className="nav-item">
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/companies" className="nav-item">
          <Building2 size={18} />
          Companies
        </NavLink>

        <NavLink to="/activity-logs" className="nav-item">
          <Activity size={18} />
          Activity Logs
        </NavLink>

        {role === "ADMIN" && (
          <NavLink to="/register-user" className="nav-item">
            <UserPlus size={18} />
            Create User
          </NavLink>
        )}

        {role === "ADMIN" && (
          <NavLink to="/register-organization" className="nav-item">
            <Building size={18} />
            Create Organization
          </NavLink>
        )}

      </nav>

    </div>

  );
}

export default Sidebar;