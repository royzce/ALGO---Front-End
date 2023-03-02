import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

export default function ConfirmDialog({ open, onConfirm, onClose, children }) {
  return (
    <Dialog open={open} onClose={onClose}>
      {/* <DialogTitle id="alert-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle> */}
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onConfirm}>
          Confirm
        </Button>
        <Button variant="outline" color="info" onClick={onClose} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
