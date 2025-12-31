import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getResponseByValue } from "../Services/Responses";
import { Link } from "react-router-dom";

function LoadResponseModel({
  loadResponseModalOpen,
  setLoadResponseModalOpen,
  searchValue,
}) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [hasMore, setHasMore] = useState(false);

  // Reset pagination when search value changes
  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  useEffect(() => {
    if (!searchValue || !loadResponseModalOpen) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await getResponseByValue(searchValue, page, limit);
        setResults(res.data.results || []);
        setHasMore(res.data.hasMore);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchValue, page, limit, loadResponseModalOpen]);

  return (
    <Modal
      open={loadResponseModalOpen}
      onClose={() => setLoadResponseModalOpen(false)}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
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
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          Filtered Responses
        </Typography>

        {loading ? (
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

        {/* Pagination */}
        {results.length > 0 && (
          <Box textAlign="center">
            <Button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              sx={{ mr: 2 }}
            >
              Previous
            </Button>

            <Typography component="span" fontWeight="bold">
              Page {page}
            </Typography>

            <Button
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasMore}
              sx={{ ml: 2 }}
            >
              Next
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
}

export default LoadResponseModel;
