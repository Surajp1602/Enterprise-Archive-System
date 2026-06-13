import { useEffect, useRef } from "react";
import {
  LuArchive,
  LuShieldCheck,
  LuClock,
  LuFileSpreadsheet,
  LuArrowRight,
  LuChartLine,
  LuLock,
  LuZap,
} from "react-icons/lu";
import "./Landing.css";

/* Reveal-on-scroll: adds .is-visible to [data-reveal] elements as they enter */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const FEATURES = [
  {
    icon: LuArchive,
    title: "Automated archiving",
    desc: "Records move to cold storage on schedule. No manual intervention, no missed deadlines.",
  },
  {
    icon: LuClock,
    title: "Retention policies",
    desc: "Define how long each document type lives. Policies enforce themselves across every department.",
  },
  {
    icon: LuShieldCheck,
    title: "Tamper-proof audit trail",
    desc: "Every action is logged immutably. Prove compliance to any auditor in seconds.",
  },
  {
    icon: LuFileSpreadsheet,
    title: "One-click exports",
    desc: "Generate CSV and Excel reports of your entire archive whenever you need them.",
  },
  {
    icon: LuChartLine,
    title: "Live analytics",
    desc: "See archive growth, department breakdowns, and document trends in real time.",
  },
  {
    icon: LuLock,
    title: "Enterprise security",
    desc: "Role-based access and encrypted storage keep sensitive records locked down.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Connect your records",
    desc: "Point ArchiveOS at your existing document sources and we ingest everything automatically.",
  },
  {
    num: "02",
    title: "Set retention rules",
    desc: "Choose how long each category is kept. The engine handles the rest, forever.",
  },
  {
    num: "03",
    title: "Stay audit-ready",
    desc: "Monitor the dashboard, export reports, and pass every compliance review with confidence.",
  },
];

const STATS = [
  { value: "10M+", label: "Records archived" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "256-bit", label: "Encryption" },
  { value: "<2s", label: "Export time" },
];

function Landing({ onLaunch }) {
  useScrollReveal();
  const heroRef = useRef(null);

  return (
    <div className="lp">
      {/* NAV */}
      <header className="lp-nav">
        <div className="lp-nav-inner">
          <div className="lp-brand">
            <span className="lp-brand-mark">
              <LuArchive size={16} aria-hidden="true" />
            </span>
            ArchiveOS
          </div>
          <nav className="lp-nav-links" aria-label="Primary">
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
            <a href="#stats">Why us</a>
          </nav>
          <div className="lp-nav-actions">
            <button className="lp-link-btn" onClick={onLaunch}>
              Sign in
            </button>
            <button className="lp-btn lp-btn-dark" onClick={onLaunch}>
              Open Dashboard
              <LuArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="lp-hero" ref={heroRef}>
        <div className="lp-hero-grid" aria-hidden="true" />
        <div className="lp-hero-inner">
          <span className="lp-pill lp-hero-pop" style={{ "--d": "0ms" }}>
            <LuZap size={13} aria-hidden="true" />
            Backed by enterprise compliance teams
          </span>
          <h1 className="lp-hero-title lp-hero-pop" style={{ "--d": "80ms" }}>
            The archive system your <span className="lp-accent">auditors</span>{" "}
            will love.
          </h1>
          <p className="lp-hero-sub lp-hero-pop" style={{ "--d": "160ms" }}>
            ArchiveOS automates record retention, keeps a tamper-proof audit
            trail, and turns compliance into a dashboard instead of a fire
            drill.
          </p>
          <div className="lp-hero-cta lp-hero-pop" style={{ "--d": "240ms" }}>
            <button className="lp-btn lp-btn-dark lp-btn-lg" onClick={onLaunch}>
              Open Dashboard
              <LuArrowRight size={16} aria-hidden="true" />
            </button>
            <a className="lp-btn lp-btn-ghost lp-btn-lg" href="#features">
              See how it works
            </a>
          </div>
          <p className="lp-hero-note lp-hero-pop" style={{ "--d": "320ms" }}>
            No credit card required. Built for teams that can&apos;t afford to
            lose a record.
          </p>
        </div>

        {/* floating product preview */}
        <div className="lp-hero-preview lp-hero-pop" style={{ "--d": "420ms" }}>
          <div className="lp-preview-bar">
            <span className="lp-dot" />
            <span className="lp-dot" />
            <span className="lp-dot" />
          </div>
          <div className="lp-preview-body">
            <div className="lp-preview-side">
              <span className="lp-preview-logo" />
              <span className="lp-skel lp-skel-active" />
              <span className="lp-skel" />
              <span className="lp-skel" />
              <span className="lp-skel" />
            </div>
            <div className="lp-preview-main">
              <div className="lp-preview-cards">
                <div className="lp-preview-card">
                  <span className="lp-skel sm" />
                  <strong>10,482</strong>
                </div>
                <div className="lp-preview-card">
                  <span className="lp-skel sm" />
                  <strong>142</strong>
                </div>
                <div className="lp-preview-card">
                  <span className="lp-skel sm" />
                  <strong>98.6%</strong>
                </div>
              </div>
              <div className="lp-preview-chart">
                {[42, 68, 54, 80, 62, 94, 72, 88].map((h, i) => (
                  <span
                    key={i}
                    className="lp-bar"
                    style={{ "--h": `${h}%`, "--i": i }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="lp-marquee" aria-hidden="true">
        <div className="lp-marquee-track">
          {[...Array(2)].map((_, dup) => (
            <div className="lp-marquee-group" key={dup}>
              {[
                "FINANCE",
                "HEALTHCARE",
                "LEGAL",
                "GOVERNMENT",
                "INSURANCE",
                "LOGISTICS",
              ].map((name) => (
                <span className="lp-marquee-item" key={name + dup}>
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="lp-section" id="features">
        <div className="lp-section-head" data-reveal>
          <span className="lp-eyebrow">Everything in one place</span>
          <h2 className="lp-section-title">
            Compliance shouldn&apos;t feel like guesswork.
          </h2>
          <p className="lp-section-sub">
            ArchiveOS brings archiving, retention, and auditing into a single
            system your whole organization can trust.
          </p>
        </div>
        <div className="lp-feature-grid">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <article
                className="lp-feature-card"
                key={f.title}
                data-reveal
                style={{ "--d": `${i * 70}ms` }}
              >
                <span className="lp-feature-icon">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="lp-section lp-how" id="how">
        <div className="lp-section-head" data-reveal>
          <span className="lp-eyebrow">How it works</span>
          <h2 className="lp-section-title">Live in three steps.</h2>
        </div>
        <div className="lp-steps">
          {STEPS.map((s, i) => (
            <div
              className="lp-step"
              key={s.num}
              data-reveal
              style={{ "--d": `${i * 110}ms` }}
            >
              <span className="lp-step-num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="lp-section lp-stats-section" id="stats">
        <div className="lp-stats" data-reveal>
          {STATS.map((s, i) => (
            <div className="lp-stat" key={s.label} style={{ "--d": `${i * 80}ms` }}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta-section">
        <div className="lp-cta" data-reveal>
          <h2>Ready to make audits boring?</h2>
          <p>
            Join the teams who replaced spreadsheets and shared drives with one
            source of truth.
          </p>
          <button className="lp-btn lp-btn-light lp-btn-lg" onClick={onLaunch}>
            Open Dashboard
            <LuArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-brand">
            <span className="lp-brand-mark">
              <LuArchive size={16} aria-hidden="true" />
            </span>
            ArchiveOS
          </div>
          <p className="lp-footer-copy">
            © {new Date().getFullYear()} ArchiveOS. Enterprise record management.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
