import ReactDOM from "react-dom/client";
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import A from "./routes/a";
import B from "./routes/b";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="a" element={<A />} />
      <Route path="b" element={<B />} />
    </Routes>
  </HashRouter>
);