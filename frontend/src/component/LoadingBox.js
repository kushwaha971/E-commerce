import { CircularProgress, Stack } from "@mui/material";
import React from "react";

function LoadingBox() {
  return (
    <Stack sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress color="success" sx={{ margin: "auto" }} />
    </Stack>
  );
}

export default LoadingBox;
