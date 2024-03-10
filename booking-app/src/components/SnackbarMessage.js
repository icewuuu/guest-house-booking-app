import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SuccessSnackbar({ message, severity }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    handleOpen();
  }, []);

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000} // Adjust as needed
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <div>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </div>
    </Snackbar>
  );
}

export default SuccessSnackbar;
