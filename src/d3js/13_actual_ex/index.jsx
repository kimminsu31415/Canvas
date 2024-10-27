import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import data from "./data.js";

const colors = [
  "#FF0000",
  "#800000",
  "#FF69B4",
  "#FFA500",
  "#32CD32",
  "#00BFFF",
  "#8A2BE2",
  "#0000FF",
  "#8B4513",
  "#006400",
];

const ActualEx1 = () => {
  const ref = useRef(null);

  useEffect(() => {
    const svg = d3.select(ref.current).attr("width", 1000).attr("height", 800);

    svg.selectAll("*").remove();

    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = 1000 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    svg
      .append("text")
      .attr("x", width / 2 + margin.left)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "24px")
      .text("주요 종합몰 앱 TOP 10 사용자 추이 (2019년 ~ 2024년)");

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.date))
      .range([0, width])
      .padding(0.1);

    chart
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    const y = d3.scaleLinear().domain([0, 3500]).range([height, 0]);

    chart.append("g").call(d3.axisLeft(y).tickValues(d3.range(0, 3600, 200)));

    chart
      .append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y).tickSize(-width).tickFormat(""))
      .selectAll("line")
      .style("opacity", 0.1);
    chart.selectAll(".grid .domain").remove();

    const line = d3
      .line()
      .x((d) => x(d.date) + x.bandwidth() / 2)
      .y((d) => y(d.value));

    Object.keys(data[0])
      .filter((key) => key !== "date")
      .forEach((key, i) => {
        const appData = data.map((d) => ({ date: d.date, value: d[key] }));
        chart
          .append("path")
          .datum(appData)
          .attr("fill", "none")
          .attr("stroke", colors[i % colors.length])
          .attr("stroke-width", 2)
          .attr("d", line);
      });

    const legend = svg
      .append("g")
      .attr(
        "transform",
        `translate(${width + margin.left + 10}, ${margin.top})`
      );

    Object.keys(data[0])
      .filter((key) => key !== "date")
      .forEach((key, i) => {
        const legendRow = legend
          .append("g")
          .attr("transform", `translate(-50, ${i * 20})`);
        legendRow
          .append("rect")
          .attr("width", 10)
          .attr("height", 10)
          .attr("fill", colors[i % colors.length]);
        legendRow.append("text").attr("x", 12).attr("y", 10).text(key);
      });

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px");

    Object.keys(data[0])
      .filter((key) => key !== "date")
      .forEach((key, i) => {
        chart
          .selectAll(`.dot-${key}`)
          .data(data)
          .enter()
          .append("circle")
          .attr("class", `dot-${key}`)
          .attr("cx", (d) => x(d.date) + x.bandwidth() / 2)
          .attr("cy", (d) => y(d[key]))
          .attr("r", 5)
          .attr("fill", colors[i % colors.length])
          .on("mouseover", (evt, d) => {
            const date = d.date;
            const values = Object.keys(d)
              .filter((key) => key !== "date")
              .map(
                (key, index) =>
                  `<div style="display: flex; align-items: center;"><div style="width: 10px; height: 10px; background-color: ${
                    colors[index % colors.length]
                  }; margin-right: 5px;"></div>${key}: ${d[key]}</div>`
              )
              .join("");
            tooltip.transition().duration(200).style("opacity", 0.9);
            tooltip
              .html(`<strong>${date}</strong><br/><br/>${values}`)
              .style("left", evt.pageX + 5 + "px")
              .style("top", evt.pageY - 28 + "px");
          })
          .on("mouseout", () => {
            tooltip.transition().duration(500).style("opacity", 0);
          });
      });
  }, [data]);

  return <svg ref={ref} />;
};

export default ActualEx1;
