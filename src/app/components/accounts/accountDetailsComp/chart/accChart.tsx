// src/components/AccChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AccChartProps {
  data: { month: string; income: number; expense: number }[];
}

const AccChart: React.FC<AccChartProps> = ({ data }) => {
  const labels = data.map((item) => item.month);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Income",
        data: data.map((item) => item.income),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Expense",
        data: data.map((item) => item.expense),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Asegúrate de usar uno de los valores permitidos para `position`
  const legendPosition:
    | "top"
    | "center"
    | "right"
    | "bottom"
    | "left"
    | "chartArea" = "top";

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: legendPosition,
      },
      title: {
        display: true,
        text: "Monthly Movements",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount",
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default AccChart;
