import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Base tokens and utility classes must load BEFORE component styles so that
// component-level rules (same specificity) win in the cascade.
import "./styles/base.css";
import "./styles/figure.css";

import App from "./App";

// Large-screen overrides load last so they win over component styles.
import "./styles/wide.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
