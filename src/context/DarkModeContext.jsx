import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext({
  darkMode: false,
  onToggleDarkmode: () => {},
});

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("darkMode")) {
      setDarkMode(Boolean(localStorage.getItem("darkMode")));
    }
  }, []);

  const handleToggleDarkMode = () => {
    if (darkMode) {
      localStorage.removeItem("darkMode");
    } else {
      localStorage.setItem("darkMode", true);
    }
    setDarkMode(!darkMode);
  };

  return (
    <DarkModeContext.Provider
      value={{ darkMode, onToggleDarkmode: handleToggleDarkMode }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};
