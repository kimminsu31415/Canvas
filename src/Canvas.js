import React, { useRef, useEffect } from 'react';

const Canvas = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.fillStyle = 'pink';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    context.lineWidth = 4;

    context.beginPath();
    for (let x = 0; x < context.canvas.width; x++) {
      const y = 100 + Math.sin(x * 0.05) * 50; // 사인파 생성
      if (x === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }
    context.strokeStyle = 'rgba(0, 0, 255, 1)'; // 파란색 선
    context.stroke();
    context.fillStyle = 'rgba(0, 255, 0, 0.5)'; // 반투명한 녹색
    context.fillRect(50, 150, 100, 100); // (x, y, width, height)

    context.beginPath();
    context.arc(300, 200, 50, 0, 2 * Math.PI);
    context.fillStyle = 'rgba(255, 0, 0, 0.7)'; // 반투명한 빨간색
    context.fill();

    context.beginPath();
    context.moveTo(50, 250);
    context.lineTo(350, 250);
    context.strokeStyle = 'rgba(255, 255, 0, 1)'; // 노란색 선
    context.lineWidth = 5; // 선 두께 설정
    context.stroke();
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
