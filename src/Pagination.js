import { Button, IconButton, List, ListItem } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const MAX_VISIBLE = 3;

function Pagination({
  page,
  totalPages,
  handleNextPage,
  handleNextPageButton,
  handlePrevPageButton,
  hasMore,
  limit,
}) {
 

  const TOTAL_PAGES = Math.ceil(totalPages / limit);

 const getPageNumbers = () => {
  const pages = [];

  // Always show first page
  pages.push(1);

  const half = Math.floor(MAX_VISIBLE / 2);

  let start = Math.max(2, page - half);
  let end = Math.min(TOTAL_PAGES - 1, page + half);

  // Near the start → expand forward
  if (page <= half + 2) {
    start = 2;
    end = Math.min(1 + MAX_VISIBLE, TOTAL_PAGES - 1);
  }

  // Near the end → expand backward
  if (page >= TOTAL_PAGES - (half + 1)) {
    start = Math.max(TOTAL_PAGES - MAX_VISIBLE, 2);
    end = TOTAL_PAGES - 1;
  }

  // Clamp values
  start = Math.max(start, 2);
  end = Math.min(end, TOTAL_PAGES - 1);

  if (start > 2) pages.push("...");

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < TOTAL_PAGES - 1) pages.push("...");

  // Always show last page
  if (TOTAL_PAGES > 1) pages.push(TOTAL_PAGES);

  return pages;
};


  const pages = getPageNumbers();

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
      <IconButton onClick={handlePrevPageButton} disabled={page === 1}>
        <ArrowBackIosIcon />
      </IconButton>

      <List sx={{ display: "flex", gap: 1, p: 0, overflow: "auto" }}>
        {pages.map((p, idx) => (
          <ListItem
            key={`${p}-${idx}`}
            onClick={() =>
              typeof p === "number" &&
              p !== page &&
              handleNextPage(p, "pagination")
            }
            sx={{
              cursor: typeof p === "number" ? "pointer" : "default",
              padding: "6px 10px",
              borderRadius: 6,
              fontWeight: p === page ? "bold" : "normal",
              bgcolor: p === page ? "primary.main" : "transparent",
              color: p === page ? "#fff" : "primary.main",
              border: "1px solid",
              borderColor: "primary.main",
              opacity: p === "..." ? 0.5 : 1,
            }}
          >
            {p}
          </ListItem>
        ))}
      </List>

      <Button
        onClick={handleNextPageButton}
        disabled={!hasMore}
        sx={{ minWidth: "auto" }}
      >
        <ArrowForwardIosIcon />
      </Button>
    </div>
  );
}

export default Pagination;
