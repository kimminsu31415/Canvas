import { useEffect, useRef } from "react";
import * as d3 from "d3";

const Axis = () => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current)
        .attr("width", 1000)
        .attr("height", 200);

    const x = d3.scaleLinear()
        .domain([1, 10])
        .range([1,500]);

    svg
      .append("g")
      .attr("transform", "translate(0,100)")
      .call(d3.axisBottom(x));
  }, []);

  return <svg ref={ref} />;
};

export default Axis;
