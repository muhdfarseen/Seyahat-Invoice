import { lazy, type LazyExoticComponent, type ComponentType } from "react";

export interface RouteConfig {
  path: string;
  id: "invoice" | "flight" | "bahrain" | "qatar" | "uae" | "oman" | "saudi";
  label: string;
  description: string;
  icon: string;
  category: "invoicing" | "flights" | "visa";
  cardBg: string;
  accentColor: string;
  component: LazyExoticComponent<ComponentType<unknown>>;
}

export const categories = [
  { key: "invoicing" as const, label: "Invoicing", icon: "📄", color: "#3b82f6" },
  { key: "flights" as const, label: "Flight Posters", icon: "✈️", color: "#10b981" },
  { key: "visa" as const, label: "Visa Posters", icon: "🛂", color: "#f59e0b" },
];

export const routes: RouteConfig[] = [
  {
    path: "invoice",
    id: "invoice",
    label: "Invoice Generator",
    description: "Generate professional invoices with custom items, taxes, and PDF export",
    icon: "📄",
    category: "invoicing",
    cardBg: "#ede8fa",
    accentColor: "#80e0d0",
    component: lazy(() => import("./pages/invoice/InvoiceGenerator")),
  },
  {
    path: "flight-poster",
    id: "flight",
    label: "Flight Rate Poster",
    description: "Create airline rate comparison posters with logos, routes, and pricing",
    icon: "✈️",
    category: "flights",
    cardBg: "#ffe8dc",
    accentColor: "#ff9f68",
    component: lazy(() => import("./pages/flight/FlightPosterGenerator")),
  },
  {
    path: "visa/bahrain",
    id: "bahrain",
    label: "Bahrain Visa",
    description: "Bahrain visa rate poster with 14-day, 90-day, and 1-year pricing",
    icon: "🇧🇭",
    category: "visa",
    cardBg: "#ffe5e8",
    accentColor: "#ff6b81",
    component: lazy(() => import("./pages/visa/BahrainVisaPoster")),
  },
  {
    path: "visa/qatar",
    id: "qatar",
    label: "Qatar Visa",
    description: "Qatar visa rate poster with multiple duration options",
    icon: "🇶🇦",
    category: "visa",
    cardBg: "#fce4ec",
    accentColor: "#b5179e",
    component: lazy(() => import("./pages/visa/QatarVisaPoster")),
  },
  {
    path: "visa/uae",
    id: "uae",
    label: "UAE Visa",
    description: "UAE visa rate poster with tourist and transit visa pricing",
    icon: "🇦🇪",
    category: "visa",
    cardBg: "#fef6db",
    accentColor: "#fcc419",
    component: lazy(() => import("./pages/visa/UAEVisaPoster")),
  },
  {
    path: "visa/oman",
    id: "oman",
    label: "Oman Visa",
    description: "Oman visa rate poster with multiple entry options",
    icon: "🇴🇲",
    category: "visa",
    cardBg: "#e3f7ed",
    accentColor: "#51cf66",
    component: lazy(() => import("./pages/visa/OmanVisaPoster")),
  },
  {
    path: "visa/saudi",
    id: "saudi",
    label: "Saudi Visa",
    description: "Saudi Arabia visa rate poster with visit and Umrah options",
    icon: "🇸🇦",
    category: "visa",
    cardBg: "#e6f4ea",
    accentColor: "#2f9e44",
    component: lazy(() => import("./pages/visa/SaudiVisaPoster")),
  },
];
