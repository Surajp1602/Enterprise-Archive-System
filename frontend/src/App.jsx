import { useEffect, useState } from "react";
import axios from "axios";

import { LuDownload, LuFileSpreadsheet, LuMenu } from "react-icons/lu";

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import DashboardPage from "./components/DashboardPage";
import RecordsPage from "./components/RecordsPage";
import AuditPage from "./components/AuditPage";
import PoliciesPage from "./components/PoliciesPage";
import ReportsPage from "./components/ReportsPage";

import "./App.css";

const PAGE_TITLES = {
  dashboard: "Dashboard",
  records: "Records",
  audit: "Audit Logs",
  policies: "Retention Policies",
  reports: "Reports",
};

function App() {
  const [stats, setStats] = useState({});
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/stats")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleNavigate = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const exportCsv = () =>
    window.open("http://127.0.0.1:5000/api/export/csv");

  const exportExcel = () =>
    window.open("http://127.0.0.1:5000/api/export/excel");

  const renderPage = () => {
    switch (activePage) {
      case "records":
        return <RecordsPage />;
      case "audit":
        return <AuditPage />;
      case "policies":
        return <PoliciesPage />;
      case "reports":
        return <ReportsPage />;
      case "dashboard":
      default:
        return <DashboardPage stats={stats} />;
    }
  };

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-area">
        <div className="mobile-topbar">
          <button
            type="button"
            className="menu-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
          >
            <LuMenu size={18} />
          </button>
          <span className="mobile-brand">ArchiveOS</span>
        </div>

        <TopBar title={PAGE_TITLES[activePage]}>
          {activePage === "dashboard" && (
            <>
              <button className="btn" onClick={exportCsv}>
                <LuDownload className="btn-icon" size={15} aria-hidden="true" />
                Export CSV
              </button>
              <button className="btn" onClick={exportExcel}>
                <LuFileSpreadsheet
                  className="btn-icon"
                  size={15}
                  aria-hidden="true"
                />
                Export Excel
              </button>
            </>
          )}
        </TopBar>

        {renderPage()}
      </div>
    </div>
  );
}

export default App;
