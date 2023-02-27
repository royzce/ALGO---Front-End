import { createContext } from "react";

export const PopupContext = createContext({});

export const PopupProvider = ({ children }) => {
  const handleSuccessMessage = (message) => {
    //green maybe
    //
    alert(message);
  };

  const handleFailMessage = (message) => {
    //red maybe??
    alert(message);
  };

  return (
    <PopupContext.Provider
      value={{
        onShowSuccess: handleSuccessMessage,
        onShowFail: handleFailMessage,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};
