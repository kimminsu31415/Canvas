import { useEffect, useRef } from "react";
import * as d3 from "d3";

const Selection = () => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);

    svg.append("circle")
        .attr("cx", 100)
        .attr("cy", 80)
        .attr("r", 50);
  }, []);

  return <svg ref={ref} width={200} height={200} />;
};

export default Selection;
