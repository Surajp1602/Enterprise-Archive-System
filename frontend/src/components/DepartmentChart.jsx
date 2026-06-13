import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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
    datasets: []
  });

  useEffect(() => {

    axios
      .get("http://127.0.0.1:5000/api/department-stats")
      .then((res) => {

        const labels = res.data.map(
          item => item.department
        );

        const counts = res.data.map(
          item => item.count
        );

        setChartData({
  labels,
  datasets: [
    {
      label: "Records",
      data: counts,
      backgroundColor: [
        "#4f46e5",
        "#06b6d4",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6"
      ],
      borderWidth: 1
    }
  ]
});

      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <div
  style={{
    width: "90%",
    height: "500px",
    margin: "40px auto",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px"
  }}
>
      <Bar
  data={chartData}
  options={{
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff"
        }
      },
      title: {
        display: true,
        text: "Department-wise Records",
        color: "#ffffff",
        font: {
          size: 20
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff"
        }
      },
      y: {
        ticks: {
          color: "#ffffff"
        }
      }
    }
  }}
/>
    </div>
  );
}

export default DepartmentChart;