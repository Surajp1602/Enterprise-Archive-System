import { useEffect, useState } from "react";
import axios from "axios";
import { LuClock, LuFileText } from "react-icons/lu";

const BADGE_BY_TYPE = {
  Contract: "badge-blue",
  Invoice: "badge-amber",
  NDA: "badge-green",
  Payslip: "badge-gray",
  "Employee Record": "badge-gray",
};

function PoliciesPage() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/retention-policies")
      .then((res) => {
        setPolicies(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-content">
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Document Type</th>
              <th>Retention Period</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={2}>
                  <div className="loading-cell">
                    <span className="spinner" aria-hidden="true" />
                    Loading policies…
                  </div>
                </td>
              </tr>
            ) : policies.length === 0 ? (
              <tr>
                <td colSpan={2}>
                  <div className="empty-state">
                    <LuFileText
                      className="empty-icon"
                      size={30}
                      aria-hidden="true"
                    />
                    <span className="empty-title">No policies defined</span>
                  </div>
                </td>
              </tr>
            ) : (
              policies.map((policy) => (
                <tr key={policy.id}>
                  <td>
                    <span
                      className={`badge ${
                        BADGE_BY_TYPE[policy.document_type] || "badge-gray"
                      }`}
                    >
                      {policy.document_type}
                    </span>
                  </td>
                  <td>
                    <span className="retention-cell">
                      <LuClock
                        className="clock-icon"
                        size={14}
                        aria-hidden="true"
                      />
                      {policy.retention_years}{" "}
                      {policy.retention_years === 1 ? "year" : "years"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PoliciesPage;
