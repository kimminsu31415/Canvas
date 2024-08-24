// Canvas.js

import React, { useRef, useEffect } from 'react';

const Canvas = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // 초기 설정: 파란색 배경 직사각형
    context.fillStyle = '#0000FF';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
