import { useEffect, useState } from "react";
import axios from "axios";
import { LuShieldCheck } from "react-icons/lu";

function AuditPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
`${import.meta.env.VITE_API_URL}/api/audit-logs`)
      .then((res) => {
        setLogs(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formatTimestamp = (value) => {
    if (!value) return "—";
    const d = new Date(value);
    if (isNaN(d.getTime())) return value;
    const date = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const time = d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${date} · ${time}`;
  };

  return (
    <div className="page-content">
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Log ID</th>
              <th>Action</th>
              <th>Performed By</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4}>
                  <div className="loading-cell">
                    <span className="spinner" aria-hidden="true" />
                    Loading audit logs…
                  </div>
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  <div className="empty-state">
                    <LuShieldCheck
                      className="empty-icon"
                      size={30}
                      aria-hidden="true"
                    />
                    <span className="empty-title">No audit logs yet</span>
                    <span className="empty-sub">
                      System activity will appear here as records are processed.
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.log_id}>
                  <td>{log.log_id}</td>
                  <td>{log.action}</td>
                  <td>
                    {String(log.performed_by).toLowerCase() === "system" ? (
                      <span className="badge badge-system">System</span>
                    ) : (
                      log.performed_by
                    )}
                  </td>
                  <td>{formatTimestamp(log.timestamp)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AuditPage;
