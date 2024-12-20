import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const generateCircles = () => {
  return Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));
};

const Transition = () => {
  const [visibleCircles, setVisibleCircles] = useState(generateCircles());
  const ref = useRef();

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCircles(generateCircles());
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const svg = d3.select(ref.current);

    svg
        .selectAll("circle")
        .data(visibleCircles, (d) => d)
        .join(
            (enter) =>
                enter
                    .append("circle")
                    .attr("cx", (d) => d * 10 + 5)
                    .attr("cy", 10)
                    .attr("r", 0)
                    .attr("fill", "cornflowerblue")
                    .transition()
                    .duration(1000)
                    .attr("r", 5),
            (update) => update.attr("fill", "lightgrey"),
            (exit) => exit.transition().duration(1000).attr("r", 0).remove()
        );
  }, [visibleCircles]);

  return <svg viewBox="0 0 100 20" ref={ref} />;
};

export default Transition;