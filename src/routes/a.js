import { Link } from "react-router-dom";

export default function A() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/b">B</Link>
      <h2>A</h2>
    </main>
  );
}