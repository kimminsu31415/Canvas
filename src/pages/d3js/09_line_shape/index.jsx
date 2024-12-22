import { useEffect, useRef } from "react";
import * as d3 from "d3";
import data from './data.js'

const LineShape = () => {
    const ref = useRef();

    useEffect(() => {
        const width = 1000;
        const height = 400;
        const margin = { top:60, right: 40, bottom: 60, left: 60 };

        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)

        const x = d3.scaleTime()  // scaleTime: x축 시간 나타냄
            .domain(d3.extent(data, d => d.date))
            .range([margin.left, width - margin.right]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([height - margin.bottom, margin.top]);

        // 라인 그리기 - line 메서드, path 사용
        const line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.value));

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#5ED3F3")
            .attr("stroke-width", 2)
            .attr("d", line);

        const xAxis = d3.axisBottom(x)
            .ticks(d3.timeMonth.every(1))
            .tickSizeOuter(0)
            .tickFormat(d3.timeFormat("%m월")); // 한국어 변환

        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(xAxis)
            .append("text")
            // x축 레이블 텍스트 (범례)
            .attr("fill", "red")
            .attr("x", width/2)
            .attr("y", margin.bottom - 10)
            .style("font-size", "12px")
            .text("월");

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            // y축 레이블 텍스트 (범례)
            .append("text")
            .attr("fill", "green")
            .attr("x", -margin.left-1)
            .attr("y", height/2)
            .attr("text-anchor", "start")
            .style("font-size", "12px")
            .text("인원 수");

        // 차트 제목
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", margin.top / 2 +10)
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .style("font-weight", "bold")
            .text("월별 도서 대여 신청자 수");

    }, []);

    return <svg ref={ref}/>
};

export default LineShape;