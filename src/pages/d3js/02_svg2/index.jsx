import { useEffect, useRef } from "react";
import * as d3 from "d3";

const Svg2 = () => {
  const ref = useRef(); // 1)
  useEffect(() => {
    // 2)
    const svgElement = d3.select(ref.current); // 3)
    svgElement
      .append("circle") // 4)
      .attr("cx", 100)
      .attr("cy", 80)
      .attr("r", 50);
  }, []);

  return (
    <>
      {/* 1 */}
      <svg ref={ref} />
    </>
  );
};

export default Svg2;
