"use client";

import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminChart = () => {
  const [chartData, setChartData] = useState<ChartData<"bar", number[], string>>({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Sales $",
          data: [18127, 22201, 19490, 17938, 24182, 17842, 22475],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgb(53, 162, 235, 0.4",
        },
      ],
    });
    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Daily Revenue",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, []);

  return (
    <div className="flex items-center justify-center p-5 mt-5 mx-5 dark:bg-gray-850 bg-white-50 dark:text-white-50 text-gray-700 rounded-lg">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default AdminChart;
