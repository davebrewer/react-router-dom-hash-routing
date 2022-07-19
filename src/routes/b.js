import { Link } from "react-router-dom";

export default function B() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/a">A</Link>
      <h2>B</h2>
    </main>
  );
}