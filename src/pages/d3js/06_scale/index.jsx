import { useEffect, useRef } from "react";
import * as d3 from "d3";

const Scale = () => {
  const ref = useRef();

  useEffect(() => {
    // SVG 크기 설정
    const width = 2000;
    const height = 200;

    // 데이터 (0 ~ 12_pie_shape,000)
    const data = Array.from({ length: 10000 }, (_, i) => i + 1);

    // SVG 요소 선택
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    // x 스케일 정의 (선형 스케일)
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)]) // 입력 도메인: 데이터의 최소값과 최대값
      .range([0,1000]); // 출력 범위: SVG의 너비

    // x축 추가
    const xAxis = d3.axisBottom(xScale);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - 100})`)
      .call(xAxis);
  }, []);

  return (
    <>
      <svg ref={ref}></svg>
    </>
  );
};

export default Scale;
