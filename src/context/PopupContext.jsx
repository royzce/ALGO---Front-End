import { Alert, AlertTitle, Button, IconButton, Snackbar } from "@mui/material";
import { createContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export const PopupContext = createContext({});

export const PopupProvider = ({ children }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSuccessMessage = (message) => {
    setSnackbarMessage(message);
    setAlertType(true);
    setOpenSnackbar(true);
    setTimeout(() => {
      handleCloseSnackbar();
    }, 3000);
  };

  const handleFailMessage = (message) => {
    setSnackbarMessage(message);
    setAlertType(false);
    setOpenSnackbar(true);
    setTimeout(() => {
      handleCloseSnackbar();
    }, 3000);
  };

  function customAlert(message) {}

  return (
    <PopupContext.Provider
      value={{
        onShowSuccess: handleSuccessMessage,
        onShowFail: handleFailMessage,
      }}
    >
      {children}
      <Snackbar open={openSnackbar} autoHideDuration={6000} sx={{ width: 300 }}>
        <Alert
          severity={alertType ? "success" : "error"}
          variant="filled"
          action={
            <IconButton
              color="inherit"
              size="small"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon />
            </IconButton>
          }
        >
          <AlertTitle>{alertType ? "Success" : "Error"}</AlertTitle>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </PopupContext.Provider>
  );
};
