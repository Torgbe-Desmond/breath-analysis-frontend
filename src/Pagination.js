import { Button, IconButton } from "@mui/material";
import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Pagination({ handlePrevPage, page, handleNextPage, hasMore }) {
  return (
    <div>
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <IconButton onClick={handlePrevPage} disabled={page === 1}>
          <ArrowBackIosIcon />
        </IconButton>
        <span style={{ margin: "0 10px", fontWeight: "bold" }}>
          Page {page}
        </span>
        <Button onClick={handleNextPage} disabled={!hasMore}>
          <ArrowForwardIosIcon />
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
