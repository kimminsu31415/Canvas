import { useEffect, useRef } from "react";
import * as d3 from "d3";

const Color = () => {
  const ref = useRef();
  useEffect(() => {
    const svg= d3.select(ref.current);
    const color = d3.color('steelblue');
    svg
      .append("circle")
      .attr("cx", 100)
      .attr("cy", 80)
      .attr("r", 50)
      .attr("fill", color);  // 색상 지정
  }, []);

  return (
    <>
      <svg ref={ref} />
    </>
  );
};

export default Color;
