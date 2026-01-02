import { Button } from "@mui/material";
import React from "react";

function Pagination({ handlePrevPage, page, handleNextPage, hasMore }) {
  return (
    <div>
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <Button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </Button>
        <span style={{ margin: "0 10px", fontWeight: "bold" }}>
          Page {page}
        </span>
        <Button onClick={handleNextPage} disabled={!hasMore}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
