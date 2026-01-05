import { Button, IconButton } from "@mui/material";
import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Pagination({
  handlePrevPage,
  page,
  limit,
  handleNextPage,
  hasMore,
  totalPages,
}) {
  console.log("total", totalPages);
  function PageNumbersArray(totalPages) {
    const mod = Math.ceil(totalPages / limit);
    return Array.from({ length: mod }, (_, i) => i + 1);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginTop: 20,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {/* PREV */}
        <IconButton
          onClick={handlePrevPage}
          disabled={page === 1}
          sx={{
            color: page === 1 ? "grey.400" : "primary.main",
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        {/* PAGE NUMBERS */}
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: 6,
            padding: 0,
            margin: 0,
            width: "100%",
          }}
        >
          {PageNumbersArray(totalPages).map((p) => (
            <li
              key={p}
              onClick={() => p !== page && handleNextPage(p)}
              style={{
                cursor: p === page ? "default" : "pointer",
                padding: "6px 10px",
                borderRadius: 6,
                fontWeight: p === page ? "bold" : "normal",
                backgroundColor: p === page ? "#1976d2" : "transparent",
                color: p === page ? "#fff" : "#1976d2",
                border: "1px solid #1976d2",
                opacity: p === page ? 1 : 0.8,
              }}
            >
              {p}
            </li>
          ))}
        </ul>

        {/* NEXT */}
        <Button
          onClick={handleNextPage}
          disabled={!hasMore}
          sx={{
            minWidth: "auto",
            color: hasMore ? "primary.main" : "grey.400",
          }}
        >
          <ArrowForwardIosIcon />
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
