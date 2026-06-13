function TopBar({ title, children }) {
  return (
    <header className="topbar">
      <h1>{title}</h1>
      {children ? <div className="topbar-actions">{children}</div> : null}
    </header>
  );
}

export default TopBar;
