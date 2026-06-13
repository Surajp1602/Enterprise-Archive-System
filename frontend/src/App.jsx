import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DashboardCards from "./components/DashboardCards";

import DepartmentChart from "./components/DepartmentChart";
import DocumentChart from "./components/DocumentChart";
import ArchiveChart from "./components/ArchiveChart";

import RecordsTable from "./components/RecordsTable";
import AuditLogs from "./components/AuditLogs";
import RetentionPolicy from "./components/RetentionPolicy";

import Footer from "./components/Footer";

import "./App.css";

function App() {

  const [stats, setStats] = useState({});

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

  return (

    <div>

      <Navbar />

      <Hero />

      <div className="dashboard">

        <DashboardCards stats={stats} />

        <div className="charts-grid">

          <div className="chart-container">
            <DepartmentChart />
          </div>

          <div className="chart-container">
            <DocumentChart />
          </div>

        </div>

        <div
          className="chart-container"
          style={{ marginBottom: "30px" }}
        >
          <ArchiveChart />
        </div>

        <div className="records-container">
          <RecordsTable />
        </div>

        <div className="audit-container">
          <AuditLogs />
        </div>

        <div className="retention-container">
          <RetentionPolicy />
        </div>

      </div>

      <Footer />

    </div>

  );
}

export default App;