import { useEffect, useRef } from "react";
import * as d3 from "d3";
import data from "./data.js";

const BarShape = () => {
  const ref = useRef();

  useEffect(() => {
    const width = 1000;
    const height = 400;
    const margin = { top: 50, right: 30, bottom: 40, left: 40 };
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);

    // x, y 축 스케일 정의
    const xScale = d3
      .scaleBand() // x축의 스케일을 생성하는 함수
      .domain(data.map((d) => d.name)) // x축에 표시할 데이터. map()을 사용하여 name을 추출한 배열을 반환
      .range([margin.left, width - margin.right])
      .padding(0.25); // 막대의 간격을 조절

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);
    //
    // // 이전 데이터 제거 (이것이 없다면 데이터를 업데이트 했을 때 블럭이 겹쳐져 보이는 것을 확인할 수 있다. (data의 맨 마지막 요소를 지웠다가 업데이트 하면 확인해보기 바란다.)
    // svg.selectAll("*").remove();

    // Bar 생성
    svg
      .append("g")
      .attr("fill", "#5ED3F3")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => xScale(d.name))
      .attr("y", (d) => yScale(d.value))
      .attr("height", (d) => yScale(0) - yScale(d.value))
      .attr("width", xScale.bandwidth());

    // 축 생성
    svg
      .append("g")
      .call(d3.axisLeft(yScale))
      .attr("transform", `translate(${margin.left},0)`);

    svg
      .append("g")
      .call(d3.axisBottom(xScale).tickSizeOuter(0))
      .attr("transform", `translate(0,${height - margin.bottom})`);

    // 차트 제목
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2 - 3)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .text("부문별 인원 현황");
  }, [data]);

  return <svg ref={ref} />;
};

export default BarShape;
