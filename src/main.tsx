import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nProvider } from "@/lib/i18n";
import { Toaster } from "@/components/ui/sonner";
import { preloadCriticalResources } from "@/components/PerformanceOptimizations";
import App from "./App.tsx";
import "./index.css";

// Preload critical resources for performance
preloadCriticalResources();

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <I18nProvider>
            <App />
            <Toaster />
          </I18nProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
