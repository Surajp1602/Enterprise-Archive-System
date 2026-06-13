import {
  FaDatabase,
  FaArchive,
  FaClipboardList,
  FaFileCsv,
  FaFileExcel
} from "react-icons/fa";

function DashboardCards({ stats }) {

  return (
    <>

      <div className="cards">

        <div className="card">
          <FaDatabase size={28} />
          <h3>Total Records</h3>
          <p>{stats.total_records}</p>
        </div>

        <div className="card">
          <FaArchive size={28} />
          <h3>Archived Records</h3>
          <p>{stats.archived_records}</p>
        </div>

        <div className="card">
          <FaClipboardList size={28} />
          <h3>Audit Logs</h3>
          <p>{stats.audit_logs}</p>
        </div>

      </div>

      <div className="export-buttons">

        <button
          className="export-btn csv-btn"
          onClick={() =>
            window.open(
              "http://127.0.0.1:5000/api/export/csv"
            )
          }
        >
          <FaFileCsv />
          Export CSV
        </button>

        <button
          className="export-btn excel-btn"
          onClick={() =>
            window.open(
              "http://127.0.0.1:5000/api/export/excel"
            )
          }
        >
          <FaFileExcel />
          Export Excel
        </button>

      </div>

    </>
  );
}

export default DashboardCards;