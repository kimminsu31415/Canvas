import { useEffect, useRef } from "react";
import * as d3 from "d3";
import data from "./data.js";

const PieShape = () => {
  const ref = useRef();

  useEffect(() => {
    // 차트 면적 구성
    const width = 1000;
    const height = 500;

    // SVG container 생성
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

    // 색상 척도 생성
    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      .range(["red", "orange", "green", "blue", "yellow"]); // 사용자 정의 색상 배열

    // pie layout과 arc generator 생성
    const pie = d3.pie().value((d) => d.value);

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(height / 2);

    const labelRadius = arc.outerRadius()() * 0.6;

    // label별 arc generator
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

    const arcs = pie(data);

    // 총합 계산
    const total = d3.sum(data, (d) => d.value);

    // 타이틀 추가
    svg
      .append("text")
      .attr("x", -width / 2 + 20) // x 속성을 조정하여 왼쪽에 배치
      .attr("y", -height / 2 + 20) // y 속성을 조정하여 상단에 배치
      .attr("text-anchor", "start") // 왼쪽 정렬
      .attr("font-size", "24px")
      .attr("font-weight", "bold")
      .text("음식 선호도");

    // 파이 조각 추가
    svg
      .append("g")
      .attr("stroke", "white")
      .selectAll("path")
      .data(arcs)
      .join("path")
      .attr("fill", (d) => color(d.data.name))
      .attr("d", arc)

    // 라벨 추가
    svg
      .append("g")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .join("text")
      .attr("transform", (d) => `translate(${arcLabel.centroid(d)})`)
      .call((text) =>
        text
          .append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .text((d) => d.data.name)
      )
      .call((text) =>
        text
          .append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .text((d) => `${((d.data.value / total) * 100).toFixed(2)}%`)
      );
  }, []);

  return <svg ref={ref} />;
};

export default PieShape;
