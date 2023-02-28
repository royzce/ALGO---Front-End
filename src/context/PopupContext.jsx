import React, { createContext } from "react";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

export const PopupContext = createContext({});

export const PopupProvider = ({ children }) => {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSuccessMessage = (message) => {
    //green maybe
    //
    // alert(message);
    handleClick();
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>;
  };

  const handleFailMessage = (message) => {
    //red maybe
    //
    alert(message);
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>;
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
