import { useState } from "react";
import apiClient from "../api/apiClient";
import Layout from "../components/Layout";
import "./forms.css";

function RegisterOrganization() {

  const [name, setName] = useState("");
  const [plan, setPlan] = useState("BASIC");

  const createOrganization = async () => {

    if (!name) {
      alert("Organization name required");
      return;
    }

    try {

      await apiClient.post("organizations/", {
        name: name,
        subscription_plan: plan
      });

      alert("Organization created successfully");

      window.location.reload();

    } catch (error) {

      if (error.response?.data?.name) {
        alert(error.response.data.name[0]);
      } else {
        alert("Error creating organization");
      }

    }

  };

  return (

    <Layout>

      <div className="form-card">

        <h2>Create Organization</h2>

        <div className="form-grid">

          <div className="form-group">

            <label>Organization Name</label>

            <input
              placeholder="Organization name"
              onChange={(e) => setName(e.target.value)}
            />

          </div>

          <div className="form-group">

            <label>Subscription Plan</label>

            <select onChange={(e) => setPlan(e.target.value)}>

              <option value="BASIC">Basic</option>
              <option value="PRO">Pro</option>

            </select>

          </div>

        </div>

        <button className="primary-btn" onClick={createOrganization}>
          Create Organization
        </button>

      </div>

    </Layout>

  );

}

export default RegisterOrganization;