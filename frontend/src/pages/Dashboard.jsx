import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import Layout from "../components/Layout";
import { Building2, Users } from "lucide-react";
import "./dashboard.css";

function Dashboard() {

  const [companies, setCompanies] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      const companiesRes = await apiClient.get("companies/");
      const contactsRes = await apiClient.get("contacts/");

      setCompanies(companiesRes.data.results);
      setContacts(contactsRes.data.results);

    };

    fetchData();

  }, []);

  return (

    <Layout>

      <h2 className="dashboard-title">
        Dashboard
      </h2>

      <div className="stats-grid">

        <div className="stat-card companies">

          <div className="stat-icon">
            <Building2 size={28} />
          </div>

          <div>
            <p className="stat-label">Total Companies</p>
            <h3 className="stat-value">{companies.length}</h3>
          </div>

        </div>


        <div className="stat-card contacts">

          <div className="stat-icon">
            <Users size={28} />
          </div>

          <div>
            <p className="stat-label">Total Contacts</p>
            <h3 className="stat-value">{contacts.length}</h3>
          </div>

        </div>

      </div>

    </Layout>

  );

}

export default Dashboard;