import { useState, useEffect } from "react";
import { Bar, Line, Doughnut, Bubble } from "react-chartjs-2";
import Papa from "papaparse";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./style.css";
import ExpenseHeatmap from "./ExpenseHeatmap";
import { expenseHeatmapData } from "./data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse("/chartjs/dashboard/data.csv", {
      download: true,
      header: true,
      complete: (results) => {
        console.log("Parsed data:", results.data);
        setData(results.data);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  }, []);

  const filterData = (dataType) => {
    return data.filter((item) => item.data_type === dataType);
  };

  const createMonthlyExpenseData = () => {
    const monthlyData = filterData("monthly_expense");
    console.log("Monthly Data:", monthlyData);
    return {
      labels: monthlyData.map((item) => item.date),
      datasets: [
        {
          label: "지출액",
          data: monthlyData.map((item) => item.value),
          borderColor: "#4ade80",
          backgroundColor: "rgba(74, 222, 128, 0.2)",
          tension: 0.4,
        },
      ],
    };
  };

  const createCategoryExpenseData = () => {
    const categoryData = filterData("category_expense");
    return {
      labels: categoryData.map((item) => item.category),
      datasets: [
        {
          data: categoryData.map((item) => item.value),
          backgroundColor: [
            "#b1f9cb",
            "#5bef91",
            "#4ade80",
            "#2f8f53",
            "#1f5e36",
            "#0c2415",
          ],
        },
      ],
    };
  };

  // const createWeeklyExpenseData = () => {
  //   const weeklyData = filterData("weekly_expense");
  //   return {
  //     labels: weeklyData.map((item) => item.date),
  //     datasets: [
  //       {
  //         data: weeklyData.map((item) => item.value),
  //         backgroundColor: (context) => {
  //           return context.dataIndex === 3 ? "#4ade80" : "#e5e7eb";
  //         },
  //         borderRadius: 20,
  //       },
  //     ],
  //   };
  // };

  const createFriendComparisonData = () => {
    const friendData = filterData("friend_comparison");
    return {
      labels: friendData.map((item) => item.category),
      datasets: [
        {
          label: "이번 달 총 지출",
          data: friendData.map((item) => item.value),
          backgroundColor: (context) => {
            return context.dataIndex === 0 ? "#4ade80" : "#9ca3af";
          },
          borderColor: (context) => {
            return context.dataIndex === 0 ? "#2ebd67" : "#8b97a8";
          },
          borderWidth: 1,
        },
      ],
    };
  };

  const createDailyExpenseBubbleData = () => {
    const dailyData = filterData("daily_expense");
    return {
      datasets: [
        {
          label: "일별 지출",
          data: dailyData.map((item) => ({
            x: new Date(item.date).getDate(),
            y: Math.floor((new Date(item.date).getDate() - 1) / 7),
            r: Math.sqrt(item.value / 1000),
          })),
          backgroundColor: (context) => {
            const value = context.raw && context.raw.r ? context.raw.r : 0;
            const alpha = Math.min(value / 10, 1);
            return `rgba(74, 222, 128, ${alpha})`;
          },
        },
      ],
    };
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("ko-KR", {
                style: "currency",
                currency: "KRW",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) =>
            new Intl.NumberFormat("ko-KR", {
              style: "currency",
              currency: "KRW",
            }).format(value),
        },
      },
    },
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat("ko-KR", {
                style: "currency",
                currency: "KRW",
              }).format(context.parsed);
            }
            return label;
          },
        },
      },
    },
  };

  const horizontalBarOptions = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.x !== null) {
              label += new Intl.NumberFormat("ko-KR", {
                style: "currency",
                currency: "KRW",
              }).format(context.parsed.x);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return new Intl.NumberFormat("ko-KR", {
              style: "currency",
              currency: "KRW",
              notation: "compact",
            }).format(value);
          },
        },
      },
    },
  };

  const bubbleChartOptions = {
    scales: {
      x: {
        min: 0,
        max: 31,
        ticks: {
          stepSize: 1,
          callback: (value) => (value % 7 === 1 ? value : ""),
        },
        title: {
          display: true,
          text: "날짜",
        },
      },
      y: {
        min: -1,
        max: 4,
        ticks: {
          stepSize: 1,
          callback: (value) =>
            ["", "1주차", "2주차", "3주차", "4주차", "5주차"][value + 1] || "",
        },
        title: {
          display: true,
          text: "주차",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const day = context.raw.x;
            const amount = (context.raw.r * context.raw.r * 1000).toFixed(0); // r 값을 다시 원래 금액으로 변환
            return `${day}일: ${new Intl.NumberFormat("ko-KR", {
              style: "currency",
              currency: "KRW",
            }).format(amount)}`;
          },
        },
      },
    },
  };

  return (
    <div className="dashboard">
      <main className="main-content">
        <div className="file-upload-container">
          <h1>8월 소비 내역</h1>
          <label htmlFor="file-upload" className="file-upload-label">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="file-upload-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            엑셀 파일 업로드
          </label>
          <input
            id="file-upload"
            type="file"
            // onChange={handleFileUpload}
            accept=".xlsx, .xls"
            className="file-upload-input"
          />
        </div>
        <div className="summary-cards">
          <div className="card dark">
            <h3>이번달 사용 금액</h3>
            <p className="amount">₩2,635,000</p>
            <p className="subtitle">Payout • $6.1K will available soon</p>
            <span className="card-icon">↗️</span>
          </div>
          <div className="card light">
            <h3>현금 사용 금액</h3>
            <p className="amount">₩395,000</p>
            <p className="subtitle">Payout • $6.1K will available soon</p>
            <span className="card-icon">↗️</span>
          </div>
          <div className="card light">
            <h3>카드 사용 금액</h3>
            <p className="amount">₩1,580,000</p>
            <p className="subtitle">Payout • $6.1K will available soon</p>
            <span className="card-icon">↗️</span>
          </div>
          <div className="card light">
            <h3>적금 지출 비용</h3>
            <p className="amount">₩263,500</p>
            <p className="subtitle">Payout • $6.1K will available soon</p>
            <span className="card-icon">↗️</span>
          </div>
          <div className="card light">
            <h3>주식 투자 비용</h3>
            <p className="amount">₩131,750 </p>
            <p className="subtitle">Payout • $6.1K will available soon</p>
            <span className="card-icon">↗️</span>
          </div>
          <div className="card light">
            <h3>고정 지출 비용</h3>
            <p className="amount">₩264,750</p>
            <p className="subtitle">Payout • $6.1K will available soon</p>
            <span className="card-icon">↗️</span>
          </div>
        </div>

        {data.length > 0 ? (
          <div className="chart-section">
            <div className="chart-card">
              <div className="chart-header">
                <h3>이번달 제일 돈이 많이 나간 곳</h3>
              </div>
              <Bar
                data={createCategoryExpenseData()}
                options={{
                  plugins: { legend: { display: false } },
                  scales: {
                    y: { display: false },
                    x: { grid: { display: false } },
                  },
                }}
              />
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3>이번달 지출 추이</h3>
                <p>일자별 총 지출액</p>
              </div>
              <Line
                data={createMonthlyExpenseData()}
                options={lineChartOptions}
              />
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3>카테고리별 지출 분포</h3>
              </div>
              <Doughnut
                data={createCategoryExpenseData()}
                options={doughnutChartOptions}
              />
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3>친구들과 지출 비교</h3>
                <p>이번 달 총 지출액 비교</p>
              </div>
              <Bar
                data={createFriendComparisonData()}
                options={horizontalBarOptions}
              />
            </div>

            <div className="transactions-section">
              <h3>월간 지출 버블 차트</h3>
              <p>일별 지출 금액 시각화</p>
              {data.length > 0 && (
                <Bubble
                  data={createDailyExpenseBubbleData()}
                  options={bubbleChartOptions}
                />
              )}
            </div>
            <div className="chart-card">
              <div className="chart-header">
                <h3>월간 지출 히트맵</h3>
              </div>
              <ExpenseHeatmap data={expenseHeatmapData} />
            </div>
          </div>
        ) : (
          <p>데이터를 불러오는 중입니다...</p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
