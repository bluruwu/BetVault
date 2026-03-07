import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './App.tsx'
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { queryClient, persister } from "./app/queryClient.ts";
import "./index.css";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister, maxAge: 1000 * 60 * 60 * 24 }}
    >
      <App />
    </PersistQueryClientProvider>
  </StrictMode>
);
