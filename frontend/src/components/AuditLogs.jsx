import { useEffect, useState } from "react";
import axios from "axios";

function AuditLogs() {

  const [logs, setLogs] = useState([]);

  useEffect(() => {

    axios
      .get(
`${import.meta.env.VITE_API_URL}/api/audit-logs`)
      .then((res) => {
        setLogs(res.data);
      });

  }, []);

  return (
    <div
      style={{
        width: "95%",
        margin: "40px auto"
      }}
    >
      <h2>Audit Logs</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Action</th>
            <th>User</th>
            <th>Timestamp</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.log_id}>
              <td>{log.log_id}</td>
              <td>{log.action}</td>
              <td>{log.performed_by}</td>
              <td>{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AuditLogs;