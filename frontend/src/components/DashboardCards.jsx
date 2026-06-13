import { LuDatabase, LuArchive, LuShieldCheck } from "react-icons/lu";

function DashboardCards({ stats }) {
  const cards = [
    {
      label: "Total Active Records",
      value: stats.total_records,
      Icon: LuDatabase,
    },
    {
      label: "Archived Records",
      value: stats.archived_records,
      Icon: LuArchive,
    },
    {
      label: "Audit Events",
      value: stats.audit_logs,
      Icon: LuShieldCheck,
    },
  ];

  return (
    <div className="metrics-row">
      {cards.map(({ label, value, Icon }) => (
        <div className="metric-card" key={label}>
          <div className="metric-label">
            <Icon size={14} aria-hidden="true" />
            {label}
          </div>
          <div className="metric-value">
            {value === undefined || value === null ? "—" : value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;
