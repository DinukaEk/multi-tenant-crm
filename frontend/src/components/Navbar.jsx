import { Link } from "react-router-dom";

function Navbar() {

    const role = localStorage.getItem("role");

    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/";
    };

    return (
        <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/dashboard">Dashboard</Link> |{" "}
        <Link to="/companies">Companies</Link> |{" "}
        <Link to="/activity-logs">Activity Logs</Link> |{" "}
        {role === "ADMIN" && (
            <Link to="/register-user">Create User</Link>
        )} |{" "}
        {role === "ADMIN" && (
            <Link to="/register-organization">Create Organization</Link>
        )}
        <button onClick={logout}>Logout</button>
        </nav>
    );
}

export default Navbar;