import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Apitester from "./components/apiTester.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Home />
    <About/>
    <Dashboard/>
    <Apitester/>
  </StrictMode>,
);
