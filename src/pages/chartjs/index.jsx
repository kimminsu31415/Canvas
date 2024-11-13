import { Outlet, useLocation } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const introduction = (
  <>
    <p>
      4장에서는 React와 Chart.js를 사용하여 다양한 유형의 차트를 만드는 방법을
      설명한다. 각 차트 유형에 대한 예제와 함께 축 설정, 애니메이션, 컬러 설정,
      데이터 처리 등의 공통 기능에 대해서 다루게된다.
    </p>
    <p>
      이 책에서는 간단하게 사용하는 내용으로 작성되어있기 때문에 좀 더 많은
      예제를 보고싶으면 Chart.js의
      Samples(https://www.chartjs.org/docs/latest/samples/information.html)를
      참고하면 좋다.
    </p>
    <p>
      React에서 Chart.js를 함께 사용할 때는 보통 &apos;react-chartjs-2&apos;
      라이브러리를 사용한다. 이 라이브러리는 Chart.js를 React 컴포넌트로 래핑한
      것이다.
    </p>
  </>
);

const community = (
  <>
    <p>💡 chart.js의 커뮤니티</p>
    <ul>
      <li>
        Join the community on{" "}
        <a style={{ color: "blue" }} href="https://discord.gg/HxEguTK6av">
          Discord
        </a>{" "}
        and{" "}
        <a style={{ color: "blue" }} href="https://twitter.com/chartjs">
          Twitter
        </a>
      </li>
      <li>
        Youtube: &nbsp;
        <a
          style={{ color: "blue" }}
          href="https://www.youtube.com/@ChartJS-tutorials/videos"
        >
          Chart JS
        </a>
      </li>
    </ul>
  </>
);

const code = `# npm
npm install react chart.js react-chartjs-2

# yarn
yarn install react chart.js react-chartjs-2

# pnpm
pnpm install react chart.js react-chartjs-2
`;

const ChartJs = () => {
  const location = useLocation();
  const path = location.pathname.split("/").pop();

  //앞글자 대문자로 변경
  const title = path.charAt(0).toUpperCase() + path.slice(1);

  return (
    <div>
      <h2>
        <span>{title}</span>
      </h2>
      {path === "chartjs" && (
        <>
          <div>{introduction}</div>
          <div>{community}</div>
          <br />
          <div>차트에 필요한 라이브러리 설치</div>
          <SyntaxHighlighter language="bash">{code}</SyntaxHighlighter>
        </>
      )}
      <Outlet />
    </div>
  );
};

export default ChartJs;
