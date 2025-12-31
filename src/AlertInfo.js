import { Alert, Snackbar } from "@mui/material";
import React from "react";

function AlertInfo({
  open,
  onClose,
  message,
  severity = "success", // "success" | "error" | "warning" | "info"
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AlertInfo;
