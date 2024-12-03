import { Outlet, useLocation } from "react-router-dom";

const D3Js = () => {
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

export default D3Js;
