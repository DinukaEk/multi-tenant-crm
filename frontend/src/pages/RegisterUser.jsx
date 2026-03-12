import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import Layout from "../components/Layout";
import "./forms.css";

function RegisterUser() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STAFF");
  const [organization, setOrganization] = useState("");
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {

    const fetchOrganizations = async () => {

      const res = await apiClient.get("organizations/");
      setOrganizations(res.data.results);

    };

    fetchOrganizations();

  }, []);

  const registerUser = async () => {

    await apiClient.post("auth/register/", {
      email,
      password,
      role,
      organization
    });

    alert("User created successfully");

    window.location.reload();

  };

  return (

    <Layout>

      <div className="form-card">

        <h2>Create User</h2>

        <div className="form-grid">

          <div className="form-group">

            <label>Email</label>

            <input
              placeholder="user@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          <div className="form-group">

            <label>User Role</label>

            <select onChange={(e) => setRole(e.target.value)}>

              <option value="MANAGER">Manager</option>
              <option value="STAFF">Staff</option>

            </select>

          </div>

          <div className="form-group">

            <label>Organization</label>

            <select onChange={(e) => setOrganization(e.target.value)}>

              <option>Select Organization</option>

              {organizations.map((org) => (

                <option key={org.id} value={org.id}>
                  {org.name}
                </option>

              ))}

            </select>

          </div>

        </div>

        <button className="primary-btn" onClick={registerUser}>
          Create User
        </button>

      </div>

    </Layout>

  );

}

export default RegisterUser;