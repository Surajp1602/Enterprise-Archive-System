import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function DocumentChart() {

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {

    axios
      .get("http://127.0.0.1:5000/api/document-stats")
      .then((res) => {

        console.log("Document Data:", res.data);

        const labels = res.data.map(
          item => item.document_type
        );

        const counts = res.data.map(
          item => item.count
        );

        setChartData({
          labels,
          datasets: [
  {
    label: "Documents",
    data: counts,
    backgroundColor: [
      "#3B82F6",
      "#10B981",
      "#F59E0B",
      "#EF4444",
      "#8B5CF6"
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
        Document Type Distribution
      </h2>

      <Pie data={chartData} />
    </div>
  );
}

export default DocumentChart;