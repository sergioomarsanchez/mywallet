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

interface CategoryChartProps {
  data: { category: string; amount: number }[];
  title: string;
  color: string;
}

const CategoryChart: React.FC<CategoryChartProps> = ({
  data,
  title,
  color,
}) => {
  const labels = data.map((item) => item.category);

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data: data.map((item) => item.amount),
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Categories",
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

export default CategoryChart;
