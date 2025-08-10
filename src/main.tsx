import { createRoot } from "react-dom/client";
import App from "./InvoiceGenerator.tsx";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    <App />
  </MantineProvider>
);
