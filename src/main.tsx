import * as React from "react";
import { createRoot } from "react-dom/client";
// Удаляем импорт AnimatePresence из framer-motion
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  // Удаляем обертку AnimatePresence
  <App />,
);
