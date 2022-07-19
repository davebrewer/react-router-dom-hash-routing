import { Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>React router dom with hash routing</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/a">A</Link> |{" "}
        <Link to="/b">B</Link>
      </nav>
    </div>
  );
}