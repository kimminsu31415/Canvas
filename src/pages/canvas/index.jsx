import { Outlet, useLocation } from "react-router-dom";

const Canvas = () => {
  const location = useLocation();
  const path = location.pathname.split("/").pop();

  return (
    <div>
      <h2>
        <span>{path}</span>
      </h2>
      <Outlet />
    </div>
  );
};

export default Canvas;
