import {
  LuLayoutDashboard,
  LuDatabase,
  LuShieldCheck,
  LuFileText,
  LuChartBar,
  LuArchive,
  LuHouse,
} from "react-icons/lu";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", Icon: LuLayoutDashboard },
  { key: "records", label: "Records", Icon: LuDatabase },
  { key: "audit", label: "Audit Logs", Icon: LuShieldCheck },
  { key: "policies", label: "Policies", Icon: LuFileText },
  { key: "reports", label: "Reports", Icon: LuChartBar },
];

function Sidebar({ activePage, onNavigate, open, onClose, onHome }) {
  const lastArchived = "Jun 13, 2026 · 02:00 AM";

  return (
    <>
      <div
        className={`sidebar-overlay ${open ? "show" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`sidebar ${open ? "open" : ""}`} aria-label="Primary">
        <button
          type="button"
          className="sidebar-brand"
          onClick={onHome}
          aria-label="Back to home"
        >
          <span className="brand-mark" aria-hidden="true">
            <LuArchive size={15} />
          </span>
          ArchiveOS
        </button>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ key, label, Icon }) => (
            <button
              key={key}
              type="button"
              className={`nav-item ${activePage === key ? "active" : ""}`}
              onClick={() => onNavigate(key)}
              aria-current={activePage === key ? "page" : undefined}
            >
              <Icon className="nav-icon" size={17} aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-system">
          <button type="button" className="home-btn" onClick={onHome}>
            <LuHouse size={15} aria-hidden="true" />
            Back to Home
          </button>

          <div className="system-label">System</div>
          <div className="system-line">
            <span className="system-dot" aria-hidden="true" />
            Last archived
          </div>
          <div className="system-line" style={{ marginTop: "4px" }}>
            {lastArchived}
          </div>
          <div className="system-line" style={{ marginTop: "8px" }}>
            v1.0.0
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
