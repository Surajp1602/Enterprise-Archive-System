import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DepartmentChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/department-stats")
      .then((res) => {
        const labels = res.data.map((item) => item.department);

        const counts = res.data.map((item) => item.count);

        setChartData({
          labels,
          datasets: [
            {
              label: "Records",
              data: counts,
              backgroundColor: "#2563eb",
              borderRadius: 6,
              borderWidth: 0,
              maxBarThickness: 38,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="chart-box">
      <Bar
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 900,
            easing: "easeOutQuart",
          },
          plugins: {
            legend: { display: false },
            title: { display: false },
            tooltip: {
              backgroundColor: "#111111",
              padding: 10,
              cornerRadius: 8,
              titleFont: { family: "Inter", size: 12 },
              bodyFont: { family: "Inter", size: 12 },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: {
                color: "#6b6b6b",
                font: { family: "Inter", size: 11 },
              },
            },
            y: {
              beginAtZero: true,
              grid: { color: "#f0f0ee" },
              border: { display: false },
              ticks: {
                color: "#6b6b6b",
                font: { family: "Inter", size: 11 },
              },
            },
          },
        }}
      />
    </div>
  );
}

export default DepartmentChart;
