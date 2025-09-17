import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { I18nProvider } from "@/lib/i18n";
import { preloadCriticalResources } from "@/components/PerformanceOptimizations";
import App from "./App.tsx";
import "./index.css";

// Preload critical resources for performance
preloadCriticalResources();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <I18nProvider>
        <App />
      </I18nProvider>
    </HelmetProvider>
  </StrictMode>
);
