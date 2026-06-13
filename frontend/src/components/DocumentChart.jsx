import { useEffect, useState } from "react";
import axios from "axios";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DocumentChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/document-stats")
      .then((res) => {
        const labels = res.data.map((item) => item.document_type);

        const counts = res.data.map((item) => item.count);

        setChartData({
          labels,
          datasets: [
            {
              label: "Documents",
              data: counts,
              backgroundColor: [
                "#2563eb",
                "#15803d",
                "#b45309",
                "#6b6b6b",
                "#0891b2",
              ],
              borderColor: "#ffffff",
              borderWidth: 2,
            },
          ],
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="chart-box">
      <Pie
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            animateRotate: true,
            duration: 900,
            easing: "easeOutQuart",
          },
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: "#6b6b6b",
                font: { family: "Inter", size: 11 },
                boxWidth: 10,
                boxHeight: 10,
                padding: 12,
                usePointStyle: true,
              },
            },
            tooltip: {
              backgroundColor: "#111111",
              padding: 10,
              cornerRadius: 8,
              titleFont: { family: "Inter", size: 12 },
              bodyFont: { family: "Inter", size: 12 },
            },
          },
        }}
      />
    </div>
  );
}

export default DocumentChart;
