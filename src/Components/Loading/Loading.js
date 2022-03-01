import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loading() {
  return (
    <CircularProgress
      disableShrink
      style={{ position: "absolute", top: "50%", left: "50%", margin: "auto" }}
    />
  );
}
