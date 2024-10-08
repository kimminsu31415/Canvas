import { Bar, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend
);

const PersonalityCareerAssessment = () => {
  // MBTI 데이터
  const mbtiData = {
    labels: [
      "외향성(E)",
      "내향성(I)",
      "감각(S)",
      "직관(N)",
      "사고(T)",
      "감정(F)",
      "판단(J)",
      "인식(P)",
    ],
    datasets: [
      {
        label: "MBTI 수치",
        data: [65, 35, 55, 45, 70, 30, 40, 60],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(199, 199, 199, 0.6)",
          "rgba(83, 102, 255, 0.6)",
        ],
      },
    ],
  };

  const mbtiOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "MBTI 유형 분석" },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: "점수" },
      },
    },
  };

  // 직업적성검사 데이터
  const careerData = {
    labels: [
      "현실형(R)",
      "탐구형(I)",
      "예술형(A)",
      "사회형(S)",
      "진취형(E)",
      "관습형(C)",
    ],
    datasets: [
      {
        label: "적성 점수",
        data: [75, 60, 85, 90, 70, 55],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const careerOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "직업적성검사 결과" },
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
      <h1>개인 성격 및 적성 분석</h1>
      <div style={{ marginBottom: "40px" }}>
        <Bar data={mbtiData} options={mbtiOptions} />
      </div>
      <div>
        <Radar data={careerData} options={careerOptions} />
      </div>
    </div>
  );
};

export default PersonalityCareerAssessment;
