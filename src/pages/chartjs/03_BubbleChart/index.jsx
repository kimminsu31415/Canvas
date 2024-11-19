import { Bubble } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const BubbleChart = () => {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    datasets: [
      {
        label: "Red dataset",
        data: Array.from({ length: 50 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
          r: Math.random() * 15,
        })),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Blue dataset",
        data: Array.from({ length: 50 }, () => ({
          x: Math.random() * 100,
          y: Math.random() * 100,
          r: Math.random() * 15,
        })),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bubble options={options} data={data} />;
};

export default BubbleChart;
