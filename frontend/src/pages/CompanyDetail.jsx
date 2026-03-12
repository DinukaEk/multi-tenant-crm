import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../api/apiClient";
import Layout from "../components/Layout";
import "./companyDetail.css";

function CompanyDetail() {

  const { id } = useParams();

  const [company, setCompany] = useState(null);
  const [contacts, setContacts] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const role = localStorage.getItem("role");

  useEffect(() => {

    const fetchCompany = async () => {

      const companyRes = await apiClient.get(`companies/${id}/`);
      const contactsRes = await apiClient.get(`contacts/?company=${id}`);

      setCompany(companyRes.data);
      setContacts(contactsRes.data.results);

    };

    fetchCompany();

  }, [id]);

  const createContact = async () => {

    await apiClient.post("contacts/", {
      full_name: name,
      email: email,
      role: "Employee",
      company: id
    });

    window.location.reload();
  };

  const deleteContact = async (contactId) => {

    await apiClient.delete(`contacts/${contactId}/`);

    setContacts(contacts.filter(c => c.id !== contactId));

  };

  if (!company) return <Layout>Loading...</Layout>;

  return (

    <Layout>

      <div className="company-header">

        <div className="company-info">

          {company.logo ? (
            <img
              src={company.logo}
              alt="logo"
              className="company-detail-logo"
            />
          ) : (
            <div className="company-logo-placeholder">
              {company.name[0]}
            </div>
          )}

          <div>

            <h2>{company.name}</h2>

            <p className="company-meta">
              {company.industry} • {company.country}
            </p>

          </div>

        </div>

      </div>


      <div className="contacts-section">

        <h3>Contacts</h3>

        <div className="contacts-grid">

          {contacts.map(contact => (

            <div key={contact.id} className="contact-card">

              <div className="contact-avatar">
                {contact.full_name[0]}
              </div>

              <div className="contact-info">

                <p className="contact-name">
                  {contact.full_name}
                </p>

                <p className="contact-email">
                  {contact.email}
                </p>

              </div>

              {role !== "STAFF" && (

                <button
                  className="delete-contact"
                  onClick={() => deleteContact(contact.id)}
                >
                  Delete
                </button>

              )}

            </div>

          ))}

        </div>

      </div>


      {role !== "STAFF" && (

        <div className="add-contact-card">

          <h3>Add Contact</h3>

          <div className="contact-form">

            <input
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={createContact}>
              Add Contact
            </button>

          </div>

        </div>

      )}

    </Layout>

  );

}

export default CompanyDetail;