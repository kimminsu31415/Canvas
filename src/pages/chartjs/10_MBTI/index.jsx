// 필요한 Chart.js 컴포넌트와 모듈을 가져온다.
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

// Chart.js에 사용할 컴포넌트들을 등록한다.
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

<<<<<<< HEAD:src/pages/chartjs/06_MBTI/index.jsx
const PersonalityCareerAssessment = () => {
  // 10_MBTI 데이터
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
        label: "10_MBTI 수치",
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
      title: { display: true, text: "10_MBTI 유형 분석" },
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
=======
const MBTI = () => {
  // MBTI 데이터를 정의한다. 각 항목은 좌우 특성과 점수를 가진다.
  const mbtiData = [
    { left: "E", right: "I", leftScore: 65, rightScore: 35 },
    { left: "S", right: "N", leftScore: 55, rightScore: 45 },
    { left: "T", right: "F", leftScore: 70, rightScore: 30 },
    { left: "J", right: "P", leftScore: 40, rightScore: 60 },
  ];

  // Chart.js에 전달할 데이터 객체를 생성한다.
  const data = {
    labels: mbtiData.map(() => ""), // 빈 레이블을 사용한다.
    datasets: [
      {
        label: "첫 번째 요소",
        data: mbtiData.map((item) => item.leftScore),
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
>>>>>>> origin/main:src/pages/chartjs/MBTI/index.jsx
      {
        label: "두 번째 요소",
        data: mbtiData.map((item) => item.rightScore),
        backgroundColor: "rgba(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart.js 옵션을 설정한다.
  const options = {
    indexAxis: "y", // 가로 방향 차트로 설정
    responsive: true,
    scales: {
      x: {
        stacked: true,
        max: 100,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        display: false, // 범례를 숨김
      },
      title: {
        display: true,
        text: "MBTI 유형 분석",
      },
      tooltip: {
        callbacks: {
          // 툴팁 커스터마이징
          label: function (context) {
            const dataIndex = context.dataIndex;
            const datasetIndex = context.datasetIndex;
            const score = context.parsed.x;
            const item = mbtiData[dataIndex];
            const label = datasetIndex === 0 ? item.left : item.right;
            return `${label}: ${score}%`;
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        position: "relative",
        height: "500px",
        width: "fit-content",
        marginBottom: "20px",
        padding: "20px",
      }}
    >
      {/* Bar 컴포넌트를 사용하여 차트를 렌더링한다. */}
      <Bar data={data} options={options} />

      {/* MBTI 레이블을 차트 위에 오버레이로 표시한다. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
        }}
      >
        {mbtiData.map((item, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: `${index * 20 + 8}%`,
              height: "25%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 10px",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            <span>{item.left}</span>
            <span>{item.right}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MBTI;
