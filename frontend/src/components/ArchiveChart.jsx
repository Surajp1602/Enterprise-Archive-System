import { useEffect, useState } from "react";
import axios from "axios";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function ArchiveChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/archive-comparison")
      .then((res) => {
        setChartData({
          labels: ["Active Records", "Archived Records"],
          datasets: [
            {
              label: "Records",
              data: [res.data.active, res.data.archived],
              backgroundColor: ["#2563eb", "#cbd5e1"],
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
      <Doughnut
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          cutout: "62%",
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

export default ArchiveChart;
