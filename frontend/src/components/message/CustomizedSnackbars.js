import React from "react";
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomizedSnackbars = props => {
  const { open, handleClose, type, message } = props;

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomizedSnackbars;