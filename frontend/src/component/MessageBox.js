import { Alert } from "@mui/material";
import React from "react";

function MessageBox(props) {
  return <Alert severity={props.variant || "info"}>{props.children}</Alert>;
}

export default MessageBox;
