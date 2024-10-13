import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import miceButton from "../imgs/miceButton.png";
import stopButton from "../imgs/stopButton.png";

const PageB = () => {
  const navigate = useNavigate();
  const [sentence, setSentence] = useState("");
  const [userPronunciation, setUserPronunciation] = useState("");
  const [correctedPronunciation, setCorrectedPronunciation] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    const fetchSentence = async () => {
      try {
        const response = await axios.get('/api/get_sentence/');
        setSentence(response.data.sentence);
      } catch (error) {
        console.error("Error fetching sentence: ", error);
      }
    };

    fetchSentence();

    // Web Speech API 설정
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'ko-KR';

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setUserPronunciation(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
      };
    } else {
      console.log('Speech recognition not supported');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleRecording = useCallback(() => {
    if (recognitionRef.current) {
      if (isRecording) {
        recognitionRef.current.stop();
        analyzePronunciation();
      } else {
        recognitionRef.current.start();
        setUserPronunciation("");
        setCorrectedPronunciation("");
      }
      setIsRecording(!isRecording);
    } else {
      console.error('Speech recognition is not initialized');
    }
  }, [isRecording]);

  const analyzePronunciation = async () => {
    try {
      const response = await axios.post('/api/analyze_pronunciation/', {
        pronunciation: userPronunciation
      });
      setCorrectedPronunciation(response.data.corrected_pronunciation);
    } catch (error) {
      console.error("Error analyzing pronunciation: ", error);
    }
  };

  const resetPronunciation = () => {
    setUserPronunciation("");
    setCorrectedPronunciation("");
  };

  return (
    <div className="flex min-h-screen justify-center bg-[#E7ECF2] font-Pretendard">
      <div className="relative flex w-[500px] justify-center bg-white lg:m-5 lg:w-screen lg:rounded-2xl">
        <div className="flex flex-col items-center">
          {/* 로고 */}
          <div className="mt-[40px] font-Pretendard text-[25px] font-[700]">
            APALogo
          </div>

          {/* 메인 영역 */}
          <div className="mt-[48px] grid w-[408px] grid-cols-1 gap-4 rounded-2xl bg-[#F2F2F2] shadow-lg lg:w-[888px] lg:justify-center">
            1/10
          </div>

          {/* 문장 제시 영역 */}
          <div className="mt-[23px] flex w-[408px] rounded-2xl bg-[#F2F2F2] shadow-lg lg:w-[888px] lg:justify-center">
            <p className="m-5 flex items-center justify-center text-wrap text-[20px] font-[500] text-black">
              {sentence || "나는 낙엽이 바람에 날리는 모습을 바라보며 낭만적인 감정에 빠져들었다."}
            </p>
          </div>

          {/* 발음 표시 영역 */}
          <div className="mt-[48px] grid w-[408px] grid-cols-1 gap-4 rounded-2xl bg-[#F2F2F2] shadow-lg lg:w-[888px] lg:justify-center">
            {/* 사용자 발음 표시 영역 */}
            <div className="flex items-center justify-center text-wrap text-[20px] font-[500] text-black">
            <p className="mx-5 mt-5 flex items-center justify-center text-wrap text-[20px] font-[500] text-black">
              {userPronunciation || "여기에 사용자 발음이 표시됩니다."}
            </p>
          </div>
            {/* 구분선 */}
            <hr className="mx-3 border-t-2 border-gray-300" />
            {/* 발음 피드백 영역 */}
            <div className="flex items-center justify-center text-wrap text-[20px] font-[500] text-black">
            <p className="mx-5 mb-5 flex items-center justify-center text-wrap text-[20px] font-[500] text-black">
              {correctedPronunciation || "여기에 수정된 발음이 표시됩니다."}
            </p>
          </div>
        </div>

          {/* 하단 영역 (버튼) */}
          <div className="absolute bottom-[87px] mx-14 grid grid-cols-2 gap-[97px]">
            <button onClick={toggleRecording}>
              <img
                src={isRecording ? stopButton : miceButton}
                alt={isRecording ? "Stop Button" : "Mice Button"}
                className="h-[60px] w-[60px]"
              />
              <p className="text-[20px] font-[500]">{isRecording ? "중지" : "말하기"}</p>
            </button>
            <button onClick={resetPronunciation}>
              <img
                src={stopButton}
                alt="Reset Button"
                className="h-[60px] w-[60px]"
              />
              <p className="text-[20px] font-[500]">초기화</p>
            </button>
          </div>
        </div>
        {/* 나가기 버튼 */}
        <div className="absolute bottom-5 right-5">
          <button className="underline" onClick={() => navigate("/")}>
            나가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageB;