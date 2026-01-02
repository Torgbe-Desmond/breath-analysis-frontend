import { CircularProgress } from "@mui/material";
import React from "react";

function Loader({ loading }) {

  return (
    <div>
      {loading && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default Loader;
