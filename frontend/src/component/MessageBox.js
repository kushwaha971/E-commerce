import { Alert, AlertTitle } from "@mui/material";
import React from "react";

function MessageBox(props) {
  return (
    <Alert severity={props.variant || "info"}>
      <AlertTitle>Error</AlertTitle>
      {props.children}
    </Alert>
  );
}

export default MessageBox;
