import { LuChartBar } from "react-icons/lu";

function ReportsPage() {
  return (
    <div className="page-content">
      <div className="reports-stub">
        <div className="stub-card">
          <LuChartBar className="stub-icon" size={32} aria-hidden="true" />
          <div className="stub-title">Advanced reports coming soon</div>
          <div className="stub-sub">
            Export CSV or Excel from the Dashboard tab for now.
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
