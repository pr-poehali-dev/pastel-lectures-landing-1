
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence } from 'framer-motion';
import App from './App';
import './index.css';

createRoot(document.getElementById("root")!).render(
  <AnimatePresence>
    <App />
  </AnimatePresence>
);
