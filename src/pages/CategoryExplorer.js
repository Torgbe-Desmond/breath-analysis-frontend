import { useEffect, useState } from "react";
import { handleGetCategories } from "../Services/Contribute";
import LoadResponseModel from "../Modals/LoadResponseModel";
import { Button, IconButton, List, ListItem, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AlertInfo from "../AlertInfo";
import { getQuestionsByCategory } from "../Services/Questions";

export default function CategoryExplorer() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadResponseModalOpen, setLoadResponseModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [answers, setAnswers] = useState({});
  const [hasMore, setHasMore] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState();
  const [isCategoriesError, setIsCategoriesError] = useState();
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

  // Fetch categories once
  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoadingCategories(true);
        const response = await handleGetCategories();
        setCategories(response.data);
      } catch (err) {
        setLoadingCategories(false);
        showError("Error occurred while fetching categories!");
        setIsCategoriesError(true);
        console.error(err);
      } finally {
        setLoadingCategories(false);
        setIsCategoriesError(false);
      }
    }
    fetchCategories();
  }, []);

  // Fetch questions whenever category or page changes
  useEffect(() => {
    if (!selectedCategory) {
      setQuestions([]);
      setPage(1);
      setHasMore(true);
      return;
    }

    async function fetchQuestions() {
      setLoading(true);
      try {
        const res = await getQuestionsByCategory(selectedCategory, page, limit);

        if (res?.data) {
          setQuestions(res.data.questions);
          setTotalQuestions(res.data.totalQuestions);
          setHasMore(res.data.hasMore);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [selectedCategory, page, limit]);

  const responseModelProps = {
    loadResponseModalOpen,
    setLoadResponseModalOpen,
    searchValue,
  };

  return (
    <div
      className="assessment-container"
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* <h2 style={{ textAlign: "flex-start", marginBottom: "20px" }}>
        
      </h2> */}
      <h3 className="assessment-title">Category Questions</h3>

      <div style={{ textAlign: "center", display: "flex", gap: "1rem" }}>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setQuestions([]);
            setPage(1);
          }}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        >
          <option value="">
            {loadingCategories ? (
              <p style={{ textAlign: "center" }}>Loading categories...</p>
            ) : (
              <p>Select a category</p>
            )}
          </option>
          {categories?.map((cat) => (
            <option style={{ fontSize: "16px" }} key={cat._id} value={cat._id}>
              <Typography> {cat.name}</Typography>
            </option>
          ))}
        </select>
        <IconButton
          onClick={() => {
            setSelectedCategory("");
            setQuestions([]);
          }}
        >
          <ClearIcon />
        </IconButton>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading questions...</p>}
      {isCategoriesError && (
        <p style={{ textAlign: "center" }}>
          <Typography>An Error occured</Typography>
          <Button>Reload</Button>
        </p>
      )}

      <div>
        {questions?.map((q) => (
          <div
            key={q._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              margin: "10px 0",
              padding: "15px",
              backgroundColor: "#fafafa",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              fontWeight={600}
              style={{ display: "block", marginBottom: "10px" }}
            >
              {q.label}
            </Typography>
            <div style={{ paddingLeft: "15px" }}>
              {q.type === "checkbox" || q.type === "radio" ? (
                <List
                  style={{
                    display: "grid",
                    listStyleType: "disc",
                    paddingLeft: "20px",
                    gap: "2px",
                  }}
                >
                  {q.options.map((opt) => (
                    <ListItem
                      key={opt}
                      onClick={() => {
                        setLoadResponseModalOpen(true);
                        setSearchValue(opt);
                      }}
                      sx={{
                        mb: 0.5,
                        px: 1.5,
                        py: 0.75,
                        borderRadius: "6px",
                        cursor: "pointer",
                        listStyle: "none",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        transition: "background-color 0.2s ease",
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                        },
                      }}
                    >
                      <span style={{ textDecoration: "underline" }}>{opt}</span>

                      <span
                        style={{
                          fontWeight: "bold",
                          fontFamily: "monospace",
                          background: "#eee",
                          padding: "2px 8px",
                          borderRadius: "12px",
                          minWidth: "32px",
                          textAlign: "center",
                        }}
                      >
                        {q.answers[opt] || 0}
                      </span>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <ul style={{ paddingLeft: "20px" }}>
                  {q.answers.map((a, i) => (
                    <li key={i} style={{ marginBottom: "4px" }}>
                      {a}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <small
              style={{ display: "block", marginTop: "10px", color: "#555" }}
            >
              Total responses: {q.totalResponses}
            </small>
          </div>
        ))}
      </div>

      {questions?.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Button
            onClick={() => {
              setQuestions([]);
              setPage((p) => Math.max(p - 1, 1));
            }}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span style={{ margin: "0 10px", fontWeight: "bold" }}>
            Page {page}
          </span>
          <Button
            onClick={() => {
              setQuestions([]);
              setPage((p) => p + 1);
            }}
            disabled={!hasMore}
          >
            Next
          </Button>
        </div>
      )}

      <LoadResponseModel {...responseModelProps} />
      <AlertInfo
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
    </div>
  );
}
