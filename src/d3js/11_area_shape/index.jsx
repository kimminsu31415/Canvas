import { useEffect, useRef } from "react";
import * as d3 from "d3";
import data from "./data.js";

const AreaShape = () => {
  const ref = useRef();

  useEffect(() => {
    const width = 1000;
    const height = 500;
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([margin.left + 5, width - margin.right]);
    // +5는        .attr("transform", `translate(${margin.left+5},0)`)의 +5와 맞춘것임 (그래야 일직선으로 수직, 수평의 경계가 겹치지 않게됨)

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.close)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const area = d3
      .area()
      .x((d) => xScale(d.date))
      .y0(yScale(0))
      .y1((d) => yScale(d.close));

    // 영역 차트 그리기
    svg.append("path").attr("fill", "#5ED3F3").attr("d", area(data));

    // X축
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(d3.timeYear.every(1))
          .tickSizeOuter(0)
          .tickFormat(d3.timeFormat("%Y")) // 연도 단위로 표시
      );

    // Y축
    svg
      .append("g")
      .attr("transform", `translate(${margin.left + 5},0)`)
      .call(d3.axisLeft(yScale).ticks(6)) // Y축 레이블 추가
      .call((g) => g.select(".domain").remove()) // Y축 라인 제거
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", width - margin.left - margin.right)
          .attr("stroke-opacity", 0.05)
      ) // 보조선 추가
      .call((g) =>
        g
          .append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("d3 다운로드 횟수")
      ); // Y축 제목 설정
  }, []);

  return <svg ref={ref} />;
};

export default AreaShape;
