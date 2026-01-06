import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetResponsesByValueQuery } from "../features/responseApi";
import Pagination from "../Pagination";

function LoadResponseModel({
  loadResponseModalOpen,
  setLoadResponseModalOpen,
  searchValue,
  selectedCategory,
  resTotalPages,
  questionLabel,
  questionId,
}) {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [hasMore, setHasMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [results, setResults] = useState([]);

  // Use RTK Query directly to fetch paginated responses
  const {
    data: responseData,
    isFetching,
    refetch,
  } = useGetResponsesByValueQuery(
    {
      value: searchValue,
      categoryId: selectedCategory,
      questionId,
      page,
      limit,
    },
    {
      skip: !searchValue, // Skip query if search is empty
    }
  );

  useEffect(() => {
    let results = responseData?.data.results || [];
    setResults(results);
    setHasMore(responseData?.data.hasMore || false);
    setTotalPages(resTotalPages);

    return () => {
      setResults([]);
      setHasMore(false);
      setTotalPages(0);
    };
  }, [responseData]);

  // Reset page to 1 whenever search value changes
  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const handlePrevPage = (nextPage) => {
    if (typeof nextPage === "number") {
      setPage(nextPage);
    }
  };

  const handleNextPage = (nextPage) => {
    if (typeof nextPage === "number") {
      setPage(nextPage);
    }
  };

  return (
    <Dialog
      open={loadResponseModalOpen}
      onClose={() => setLoadResponseModalOpen(false)}
    >
      <Paper
        sx={{
          width: { xs: 350, sm: 500 },
          maxHeight: "80vh",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 3,
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography>{questionLabel}</Typography>
        <DialogContent dividers>
          {isFetching ? (
            <Typography align="center">Loading...</Typography>
          ) : results.length === 0 ? (
            <Typography align="center">No results found</Typography>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "1fr 1fr 1fr",
                },
                gap: 2,
              }}
            >
              {results.map((item, index) => (
                <Link
                  key={item._id}
                  target="_blank"
                  rel="noopener noreferrer"
                  to={`/response/${item._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      fontFamily: "monospace",
                      textDecoration: "underline",
                      textAlign: "center",
                    }}
                  >
                    Response {(page - 1) * limit + index + 1}
                  </Typography>
                </Link>
              ))}
            </Box>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {results.length > 0 && (
            <Pagination
              page={page}
              limit={limit}
              totalPages={resTotalPages}
              hasMore={hasMore}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
            />
          )}
        </DialogActions>
      </Paper>
    </Dialog>
  );
}

export default LoadResponseModel;
