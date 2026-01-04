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
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function LoadResponseModel({
  loadResponseModalOpen,
  setLoadResponseModalOpen,
  searchValue,
}) {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Use RTK Query directly to fetch paginated responses
  const {
    data: responseData,
    isFetching,
    refetch,
  } = useGetResponsesByValueQuery(
    { value: searchValue, page, limit },
    {
      skip: !searchValue, // Skip query if search is empty
    }
  );

  // Reset page to 1 whenever search value changes
  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const results = responseData?.data.results || [];
  const hasMore = responseData?.data.hasMore || false;

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
        <DialogTitle
          className="assessment-title"
          variant="h5"
          fontWeight="bold"
          textAlign="flex-start"
        >
          Responses
        </DialogTitle>

        <Alert severity="info">These are real life experiences of people</Alert>

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

        <DialogActions alignItems="center">
          {results.length > 0 && (
            <Box
              textAlign="center"
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                sx={{ mr: 2 }}
              >
                <ArrowBackIosIcon />
              </IconButton>

              <Typography component="span" fontWeight="bold">
                Page {page}
              </Typography>

              <IconButton
                onClick={() => setPage((p) => p + 1)}
                disabled={!hasMore}
                sx={{ ml: 2 }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
          )}
        </DialogActions>
      </Paper>
    </Dialog>
  );
}

export default LoadResponseModel;
