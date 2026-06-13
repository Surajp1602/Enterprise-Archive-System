import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ArchiveChart() {

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {

    axios
      .get("http://127.0.0.1:5000/api/archive-comparison")
      .then((res) => {

        setChartData({
          labels: [
            "Active Records",
            "Archived Records"
          ],
          datasets: [
  {
    label: "Records",
    data: [
      res.data.active,
      res.data.archived
    ],
    backgroundColor: [
      "#10B981",
      "#EF4444"
    ],
    borderWidth: 1
  }
]
        });

      })
      .catch((err) => {
        console.error(err);
      });

  }, []);

  return (
    <div
      style={{
        width: "500px",
        margin: "40px auto"
      }}
    >
      <h2 style={{ textAlign: "center" }}>
        Active vs Archived Records
      </h2>

      <Doughnut data={chartData} />
    </div>
  );
}

export default ArchiveChart;