import React, { useState, useEffect, createContext } from "react";

import MuiAlert from '@mui/material/Alert'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// const CustomizedSnackbars = props => {
//   const { open, handleClose, type, message } = props;
// }

export const SnackBarContext = createContext({
  addSnack: () => "",
});

export const SnackbarProvider = ({ children }) => {
  const [snacks, setSnack] = useState([])

  useEffect(() => {
    if (snacks.length > 0) {
      const timer = setTimeout(() => {
        setSnack((snacks) => snacks.slice(1));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [snacks]);

  const addSnack = (snack) => {
    console.log(snack)
    if (snacks.length === 3) {
      const reducedSnacks = snacks.slice(1);
      setSnack([...reducedSnacks, snack]);
    } else {
      setSnack((prev) => [...prev, snack]);
    }
  };
return (
    <SnackBarContext.Provider value={{ addSnack }}>
      {snacks.map((snack, i) => (
        <Alert key={i} severity={snack.type}>
          {snack.message}
        </Alert>
      ))}
      {children}
    </SnackBarContext.Provider>
  );
};