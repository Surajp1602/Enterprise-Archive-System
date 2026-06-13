import { useEffect, useState } from "react";
import axios from "axios";
import { LuSearch, LuInbox, LuChevronLeft, LuChevronRight } from "react-icons/lu";

const PAGE_SIZE = 15;

function RecordsPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [documentType, setDocumentType] = useState("");

  const [page, setPage] = useState(1);

  const fetchRecords = () => {
    setLoading(true);
    axios
      .get(
        `http://127.0.0.1:5000/api/records?search=${search}&department=${department}&document_type=${documentType}`
      )
      .then((res) => {
        setRecords(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRecords();
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, department, documentType]);

  const totalPages = Math.max(1, Math.ceil(records.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageRecords = records.slice(start, start + PAGE_SIZE);

  const formatDate = (value) => {
    if (!value) return "—";
    const d = new Date(value);
    if (isNaN(d.getTime())) return value;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="page-content">
      <div className="filter-bar">
        <div className="search-field">
          <LuSearch className="search-icon" size={16} aria-hidden="true" />
          <input
            className="input"
            type="text"
            placeholder="Search by name, department…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search records"
          />
        </div>

        <select
          className="select"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          aria-label="Filter by department"
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="Operations">Operations</option>
        </select>

        <select
          className="select"
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          aria-label="Filter by document type"
        >
          <option value="">All Documents</option>
          <option value="Contract">Contract</option>
          <option value="Invoice">Invoice</option>
          <option value="Payslip">Payslip</option>
          <option value="Employee Record">Employee Record</option>
          <option value="NDA">NDA</option>
        </select>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Record ID</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Document Type</th>
              <th>Joining Date</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7}>
                  <div className="loading-cell">
                    <span className="spinner" aria-hidden="true" />
                    Loading records…
                  </div>
                </td>
              </tr>
            ) : pageRecords.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <div className="empty-state">
                    <LuInbox className="empty-icon" size={30} aria-hidden="true" />
                    <span className="empty-title">No records found</span>
                    <span className="empty-sub">
                      Try adjusting your search or filters.
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              pageRecords.map((record) => (
                <tr key={record.record_id}>
                  <td>{record.record_id}</td>
                  <td>{record.employee_name}</td>
                  <td>{record.department}</td>
                  <td>{record.document_type}</td>
                  <td>{formatDate(record.joining_date)}</td>
                  <td>
                    {String(record.status).toLowerCase() === "active" ? (
                      <span className="badge badge-success">Active</span>
                    ) : (
                      <span className="badge badge-archived">
                        {record.status}
                      </span>
                    )}
                  </td>
                  <td>{formatDate(record.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && records.length > 0 && (
        <div className="pagination">
          <span className="pagination-info">
            Page {page} of {totalPages}
          </span>
          <div className="pagination-controls">
            <button
              className="btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              <LuChevronLeft size={15} aria-hidden="true" />
              Previous
            </button>
            <button
              className="btn"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              Next
              <LuChevronRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecordsPage;
