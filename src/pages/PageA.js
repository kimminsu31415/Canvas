import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PageA = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const Title = ({ children, className }) => (
  <div className={`font-Pretendard text-[40px] font-[700] ${className}`}>
    {children}
  </div>
);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/main/');
        console.log("API Response:", response.data);
        setMessage(response.data.message);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setMessage("");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen justify-center bg-[#E7ECF2]">
      <div className="relative flex w-[500px] justify-center bg-white lg:m-5 lg:w-screen lg:rounded-2xl">
        <div className="flex flex-col items-center">
          {/* 로고 */}
          <div className="mt-[40px] font-Pretendard text-[25px] font-[700]">
            APALogo
          </div>

          {/* 메인 영역 */}
          <div className="mt-[226px] font-Pretendard text-[30px] font-[300]">
            AI 발음 교정기
          </div>
          <Title className="mt-[10px] lg:hidden">
            AI Pronunciation
          </Title>
          <Title className="lg:hidden">
            Assistant
          </Title>
          <div className="hidden lg:mt-[10px] lg:block lg:font-Pretendard lg:text-[40px] lg:font-[700]">
            AI Pronunciation Assistant
          </div>

          {/* 디버깅 정보 영역 */}
          <div className="mt-[20px] p-4 border rounded-lg bg-gray-100 w-[80%]">
            <h3 className="font-bold">디버깅 정보:</h3>
            <p>로딩 상태: {loading ? "로딩 중" : "로딩 완료"}</p>
            <p>메시지: {message || "메시지 없음"}</p>
            <p>에러: {error || "에러 없음"}</p>
          </div>

          {/* 하단 영역 (버튼) */}
          <div className="absolute bottom-[87px] mx-14">
            <button
              className="h-[56px] w-[392px] rounded-2xl bg-black font-Pretendard text-[20px] font-[700] text-white"
              onClick={() => navigate("/pageB")}
            >
              발음 테스트 시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageA;