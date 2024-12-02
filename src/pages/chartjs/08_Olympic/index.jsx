import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const OlympicAthleteStats = () => {
  const athletes = ["김연아", "우사인 볼트", "마이클 펠프스", "시몬 바일스"];
  const stats = ["스피드", "근력", "지구력", "유연성", "정신력", "기술"];

  const generateAthleteData = () =>
    stats.map(() => Math.floor(Math.random() * 50) + 50);

  const data = {
    labels: stats,
    datasets: athletes.map((athlete, index) => ({
      label: athlete,
      data: generateAthleteData(),
      backgroundColor: `rgba(${index * 60}, 99, 132, 0.2)`,
      borderColor: `rgba(${index * 60}, 99, 132, 1)`,
      borderWidth: 1,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "올림픽 선수들의 능력치 비교" },
    },
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h1>올림픽 선수 능력치 차트</h1>
      <Radar data={data} options={options} />
    </div>
  );
};

export default OlympicAthleteStats;
