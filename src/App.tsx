import { useState, useEffect, Suspense } from "react";
import { LoadingOverlay } from "@mantine/core";
import LandingPage from "./pages/landing/LandingPage";
import { NavigationContext } from "./NavigationContext";
import { routes } from "./routes";

const App = () => {
  const [currentPath, setCurrentPath] = useState(() => {
    const hash = window.location.hash.replace("#/", "");
    return hash || "";
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#/", "");
      setCurrentPath(hash || "");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = `#/${path}`;
  };

  const navigateHome = () => {
    window.location.hash = "#/";
  };

  // Find matching route for tools
  const matchedRoute = routes.find((r) => r.path === currentPath);

  // Redirect invalid routes to home
  useEffect(() => {
    if (currentPath && !matchedRoute) {
      navigateHome();
    }
  }, [currentPath, matchedRoute]);

  const PageComponent = matchedRoute?.component;

  return (
    <NavigationContext.Provider value={{ navigateHome, navigate }}>
      <Suspense fallback={<LoadingOverlay visible />}>
        {currentPath === "" || currentPath === "/" ? (
          <LandingPage />
        ) : PageComponent ? (
          <PageComponent key={matchedRoute.path} />
        ) : null}
      </Suspense>
    </NavigationContext.Provider>
  );
};

export default App;
