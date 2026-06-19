
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import "./styles/responsive-accessibility.css";
  import "./styles/mobile-hero-overrides.css";

  createRoot(document.getElementById("root")!).render(<App />);
  