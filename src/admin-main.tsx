import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/base.css";
import "./styles/admin.css";

import { AdminPage } from "./pages/AdminPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AdminPage />
  </StrictMode>,
);
