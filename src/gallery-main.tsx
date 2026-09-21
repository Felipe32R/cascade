import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Same load order as the home page: base tokens before component styles.
import "./styles/base.css";
import "./styles/figure.css";

import { GalleryPage } from "./pages/GalleryPage";

// Large-screen overrides load last so they win over component styles.
import "./styles/wide.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GalleryPage />
  </StrictMode>,
);
