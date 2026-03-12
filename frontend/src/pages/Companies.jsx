import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import "./companies.css";

function Companies() {

  const [companies, setCompanies] = useState([]);
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [country, setCountry] = useState("");
  const [logo, setLogo] = useState(null);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {

    const loadCompanies = async () => {
      const res = await apiClient.get("companies/");
      setCompanies(res.data.results);
    };

    loadCompanies();

  }, []);

  const searchCompanies = async () => {

    const res = await apiClient.get(`companies/?search=${search}`);
    setCompanies(res.data.results);

  };

  const createCompany = async () => {

    if (!name || !industry || !country) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("industry", industry);
    formData.append("country", country);

    if (logo) {
      formData.append("logo", logo);
    }

    await apiClient.post("companies/", formData);

    alert("Company created");
    window.location.reload();

  };

  const deleteCompany = async (id) => {

    if (!window.confirm("Delete this company?")) return;

    await apiClient.delete(`companies/${id}/`);

    alert("Company deleted");
    window.location.reload();

  };

  return (

    <Layout>

      <div className="companies-header">

        <h2>Companies</h2>

        <div className="search-box">

          <input
            placeholder="Search companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={searchCompanies}>
            Search
          </button>

        </div>

      </div>

      <div className="table-card">

        <table className="companies-table">

          <thead>

            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Industry</th>
              <th>Country</th>
              {role === "ADMIN" && <th>Actions</th>}
            </tr>

          </thead>

          <tbody>

            {companies.map((company) => (

              <tr
                key={company.id}
                onClick={() => navigate(`/companies/${company.id}`)}
              >

                <td>
                  {company.logo ? (
                    <img
                      src={company.logo}
                      className="company-logo"
                      alt=""
                    />
                  ) : (
                    <div className="logo-placeholder">
                      {company.name[0]}
                    </div>
                  )}
                </td>

                <td className="company-name">
                  {company.name}
                </td>

                <td>{company.industry}</td>
                <td>{company.country}</td>

                {role === "ADMIN" && (

                  <td>

                    <button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCompany(company.id);
                      }}
                    >
                      Delete
                    </button>

                  </td>

                )}

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {(role === "ADMIN" || role === "MANAGER") && (

        <div className="create-card">

          <h3>Create Company</h3>

          <div className="form-grid">

            <input
              placeholder="Company Name"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Industry"
              onChange={(e) => setIndustry(e.target.value)}
            />

            <input
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
            />

            <input
              type="file"
              onChange={(e) => setLogo(e.target.files[0])}
            />

          </div>

          <button className="create-btn" onClick={createCompany}>
            Create Company
          </button>

        </div>

      )}

      {role === "STAFF" && (
        <p className="readonly-text">
          You have read-only access.
        </p>
      )}

    </Layout>

  );

}

export default Companies;