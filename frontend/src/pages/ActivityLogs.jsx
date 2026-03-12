import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import Layout from "../components/Layout";
import "./activityLogs.css";

function ActivityLogs() {

  const [logs, setLogs] = useState([]);

  useEffect(() => {

    const fetchLogs = async () => {

      const res = await apiClient.get("activity-logs/");
      setLogs(res.data.results);

    };

    fetchLogs();

  }, []);

  const getActionClass = (action) => {

    if (!action) return "badge";

    const a = action.toLowerCase();

    if (a.includes("create")) return "badge create";
    if (a.includes("delete")) return "badge delete";
    if (a.includes("update")) return "badge update";

    return "badge";
  };

  return (

    <Layout>

      <h2 className="audit-title">
        Activity Logs
      </h2>

      <div className="audit-card">

        <table className="audit-table">

          <thead>

            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Model</th>
              <th>Object ID</th>
              <th>Time</th>
            </tr>

          </thead>

          <tbody>

            {logs.map((log) => (

              <tr key={log.id}>

                <td className="audit-user">
                  {log.user}
                </td>

                <td>
                  <span className={getActionClass(log.action)}>
                    {log.action}
                  </span>
                </td>

                <td>{log.model_name}</td>

                <td className="object-id">
                  #{log.object_id}
                </td>

                <td className="audit-time">

                  {log.timestamp
                    ? new Date(log.timestamp).toLocaleString()
                    : "—"}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </Layout>

  );
}

export default ActivityLogs;