import { useContext } from "react";

import { SnackBarContext } from "../SnackbarProvider";

export const useSnackbar = () => useContext(SnackBarContext);