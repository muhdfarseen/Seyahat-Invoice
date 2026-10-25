import { createContext, useContext } from "react";

interface NavigationContextType {
  navigateHome: () => void;
  navigate: (path: string) => void;
}

export const NavigationContext = createContext<NavigationContextType>({
  navigateHome: () => {},
  navigate: () => {},
});

export const useNavigation = () => useContext(NavigationContext);
