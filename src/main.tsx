import { createRoot } from "react-dom/client";
import { useState } from "react";
import InvoiceGenerator from "./InvoiceGenerator.tsx";
import PosterGenerator from "./PosterGenerator.tsx";
import BahrainPosterEditor from "./BahrainPosterEditor.tsx";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

const App = () => {
  const [page, setPage] = useState<"invoice" | "poster" | "bahrain">("invoice");

  return (
    <MantineProvider>
      {page === "invoice" ? (
        <InvoiceGenerator
          onNavigatePoster={() => setPage("poster")}
          onNavigateBahrain={() => setPage("bahrain")}
        />
      ) : page === "poster" ? (
        <PosterGenerator onNavigateInvoice={() => setPage("invoice")} />
      ) : (
        <BahrainPosterEditor onNavigateBack={() => setPage("invoice")} />
      )}
    </MantineProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
