import { useEffect, useState } from "react";
import { getResponseById } from "../Services/Responses";
import { useParams } from "react-router-dom";
import AlertInfo from "../AlertInfo";
import { Box, Button, Paper, Skeleton } from "@mui/material";
import JsonPreviewModal from "../Modals/JsonPreviewModal";
import { useGetResponseJsonQuery } from "../features/responseApi";

function SingleResponse() {
  const { responseId } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSuccess = (message) => {
    setSnackbar({ open: true, message, severity: "success" });
  };

  const showError = (message) => {
    setSnackbar({ open: true, message, severity: "error" });
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const { data: responseData } = useGetResponseJsonQuery({ responseId });

  const responseJson = responseData?.data || [];

  const handleOpen = async () => {
    setJsonData(responseJson);
    setOpen(true);
  };

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        setLoading(true);
        const response = await getResponseById(responseId);

        if (response.data) {
          setResults(response.data);
        }
      } catch (error) {
        showError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResponse();
  }, [responseId]);

  const SkeletonQuestion = () => (
    <div style={{ marginBottom: "1rem" }}>
      <Skeleton variant="text" width="60%" height={24} />
      <Skeleton variant="rectangular" height={20} sx={{ mt: 1 }} />
    </div>
  );

  // ================= JSX =================
  if (loading)
    return (
      <div className="assessment-container">
        <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
        {[...Array(5)].map((_, i) => (
          <SkeletonQuestion key={i} />
        ))}
        <Skeleton variant="rectangular" height={48} width={150} />
      </div>
    );

  return (
    <Paper className="assessment-container">
      <h3 className="assessment-title">Response</h3>

      {loading && <p style={{ textAlign: "center" }}>Loading response...</p>}

      <form className="assessment-form">
        {results.map((q, index) => (
          <div
            key={q._id || index}
            className="assessment-question"
            style={{ marginBottom: "1rem" }}
          >
            <label>
              <strong>{q.questionText}</strong>
            </label>

            <div
              className="assessment-input-block"
              style={{
                marginTop: "0.5rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              {Array.isArray(q.value) ? (
                q.value.map((val, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "4px",
                      fontSize: "0.9rem",
                    }}
                  >
                    {val}
                  </span>
                ))
              ) : (
                <span
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "4px",
                    fontSize: "0.9rem",
                  }}
                >
                  {q.value}
                </span>
              )}
            </div>
          </div>
        ))}

        <Box>
          {jsonData && (
            <Button
              className="assessment-btn"
              variant="contained"
              onClick={handleOpen}
            >
              View JSON
            </Button>
          )}
        </Box>
      </form>
      <AlertInfo
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />

      <JsonPreviewModal
        open={open}
        onClose={() => setOpen(false)}
        jsonData={jsonData}
      />
    </Paper>
  );
}

export default SingleResponse;
