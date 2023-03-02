import { createContext, useState } from "react";

export const DarkModeContext = createContext({
  darkMode: false,
  onToggleDarkmode: () => {},
});

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === true
  );

  const handleToggleDarkMode = () => {
    console.log("inside handle toggle dark", darkMode);
    localStorage.setItem("darkMode", !darkMode);
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
