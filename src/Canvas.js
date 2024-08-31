import React, { useRef, useEffect, useState } from 'react';

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(window.innerWidth);
  const [sliderValue, setSliderValue] = useState(0); // 바의 값 상태

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Canvas 크기를 화면 가로 크기와 400px 높이로 설정
    canvas.width = canvasWidth;
    canvas.height = 400;

    // 배경을 설정: 위쪽은 하늘색, 아래쪽은 어두운 색
    const midHeight = canvas.height / 2;

    const phaseShift = (sliderValue * 8 * Math.PI) / 100; // 바의 값에 따른 위상 변화
    const startX = canvas.width * 0.3; // 해의 위치를 약간 오른쪽으로 이동
    const startY =
      midHeight -
      100 * Math.sin((startX / canvas.width) * 2 * Math.PI + phaseShift);

    // 배경을 설정: 해의 y 위치에 따라 아래 배경 색상 변경
    context.fillStyle = '#FFFFFF'; // 위쪽 배경은 항상 하늘색
    context.fillRect(0, 0, canvas.width, midHeight);

    if (startY < midHeight) {
      // 해가 x축 위에 있을 때 (낮), 아래 배경도 하늘색으로 변경
      context.fillStyle = '#FFFFFF';
      context.fillRect(0, midHeight, canvas.width, midHeight);
    } else {
      // 해가 x축 아래에 있을 때 (밤), 아래 배경은 어두운 색으로 유지
      context.fillStyle = '#171717';
      context.fillRect(0, midHeight, canvas.width, midHeight);
    }

    // X축 그리기
    context.strokeStyle = '#E3E3E3';
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(0, midHeight);
    context.lineTo(canvas.width, midHeight);
    context.stroke();

    // Sin 그래프 그리기
    let intersectionPoints = []; // 교차 지점 x좌표를 저장할 배열

    context.beginPath();
    for (let x = 0; x < canvas.width; x++) {
      const y =
        midHeight -
        100 * Math.sin((x / canvas.width) * 2 * Math.PI + phaseShift);

      // y 값이 midHeight에 매우 가까운 경우 교차점으로 간주
      if (Math.abs(y - midHeight) < 1) {
        intersectionPoints.push(x); // 모든 교차점의 x좌표를 저장
      }

      // 그래프의 색상을 x축 위/아래에 따라 다르게 설정
      if (y < midHeight) {
        context.strokeStyle = '#FEC62B'; // 해와 같은 색 (오렌지색)
      } else {
        context.strokeStyle = '#E3E3E3'; // 회색
      }

      context.lineTo(x, y);
      context.stroke();
      context.beginPath(); // 각각의 선분을 개별적으로 그리기 위해 경로를 재설정
      context.moveTo(x, y);
    }

    // 모든 교차점에 세로선 그리기
    intersectionPoints.forEach((x) => {
      context.strokeStyle = '#E3E3E3'; // 회색선
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(x, midHeight - 15); // 세로선의 길이를 30px
      context.lineTo(x, midHeight + 15); // 15px 아래로
      context.stroke();
    });

    // 더 큰 원 그리기 (연한 오렌지색)
    context.fillStyle = 'rgba(254, 198, 43, 0.5)'; // #FEC62B 색상, 오퍼시티 50%
    context.beginPath();
    context.arc(startX, startY, 12, 0, 2 * Math.PI); // 반지름 12px
    context.fill();

    // 해 그리기 (오렌지색)
    context.fillStyle = '#FEC62B'; // 오렌지색
    context.beginPath();
    context.arc(startX, startY, 8, 0, 2 * Math.PI); // 반지름 8px (기존보다 크게)
    context.fill();
  }, [canvasWidth, sliderValue]);

  return (
    <div>
      <canvas ref={canvasRef} {...props} />
      <input
        type="range"
        style={{ width: `${canvasWidth}px`, marginTop: '20px' }}
        min="0"
        max="100"
        onChange={(e) => setSliderValue(e.target.value)}
      />
    </div>
  );
};

export default Canvas;
