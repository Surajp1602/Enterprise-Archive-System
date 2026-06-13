import DashboardCards from "./DashboardCards";
import DepartmentChart from "./DepartmentChart";
import DocumentChart from "./DocumentChart";
import ArchiveChart from "./ArchiveChart";

function DashboardPage({ stats }) {
  return (
    <div className="page-content">
      <DashboardCards stats={stats} />

      <div className="charts-row">
        <div className="panel">
          <h2 className="panel-heading">Records by Department</h2>
          <DepartmentChart />
        </div>

        <div className="panel">
          <h2 className="panel-heading">Records by Document Type</h2>
          <DocumentChart />
        </div>

        <div className="panel">
          <h2 className="panel-heading">Active vs Archived</h2>
          <ArchiveChart />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
