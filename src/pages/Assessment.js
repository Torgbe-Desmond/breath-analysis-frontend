import { useEffect, useState } from "react";
import "./Assessment.css";
import { handleGetQuestions } from "../Services/Contribute";
import {
  CreateResponse,
  GetResponseByEmail,
  UpdateResponse,
} from "../Services/Assessment";
import AlertInfo from "../AlertInfo";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Skeleton,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import FloatingCounter from "../FloatingCounter";
import { useHandleGetQuestionsQuery } from "../features/questionApi";
import {
  useCreateResponseMutation,
  useGetResponseByEmailQuery,
  useUpdateResponseMutation,
} from "../features/responseApi";
import { skipToken } from "@reduxjs/toolkit/query";
import "./Assessment.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import Pagination from "../Pagination";

const emailSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

function TabPanel({ value, index, children }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function Assessment() {
  const [answers, setAnswers] = useState({});
  const [existingResponseId, setExistingResponseId] = useState(null);
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [hasMore, setHasMore] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: emailSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: () => {},
  });

  const email = formik.values.email;

  /* ================= RTK QUERY ================= */

  // Questions
  const {
    data: questionsData,
    isLoading: loadingQuestions,
    isError: isQuestionsError,
    isFetching,
    refetch,
  } = useHandleGetQuestionsQuery({
    page,
    limit,
  });

  useEffect(() => {
    let results = questionsData?.data.questions || [];
    setQuestions(results);
    setHasMore(questionsData?.data.hasMore || false);
    setTotalPages(questionsData?.data.totalQuestions || 0);

    return () => {
      setHasMore([]);
      setHasMore(false);
      setTotalPages(0);
    };
  }, [questionsData]);

  // Existing response (email dependent)
  const { data: existingResponse } = useGetResponseByEmailQuery(
    email && !formik.errors.email ? email : skipToken
  );

  // Mutations
  const [createResponse, { isLoading: creating, isSuccess }] =
    useCreateResponseMutation();

  const [updateResponse, { isLoading: updating }] = useUpdateResponseMutation();

  const loadingSubmit = creating || updating;

  /* ================= EFFECTS ================= */

  // When old response loads → populate answers
  useEffect(() => {
    if (!existingResponse?.data) {
      setExistingResponseId(null);
      setAnswers({});
      return;
    }

    const { _id, answers } = existingResponse.data;
    setExistingResponseId(_id);

    console.log("answers", answers.length);

    // Use Map to ensure uniqueness by questionId
    const map = new Map();
    answers.forEach((a) => {
      map.set(a.questionId.toString(), a.value); // key = questionId, value = answer
    });

    // Convert back to object for local state
    const mapped = Object.fromEntries(map);
    setAnswers(mapped);
  }, [existingResponse]);

  /* ================= ALERT HELPERS ================= */

  const showSuccess = (message) =>
    setSnackbar({ open: true, message, severity: "success" });

  const showError = (message) =>
    setSnackbar({ open: true, message, severity: "error" });

  const closeSnackbar = () => setSnackbar((p) => ({ ...p, open: false }));

  /* ================= INPUT HANDLER ================= */

  const handleChange = (questionId, value, type, checked) => {
    setAnswers((prev) => {
      const updated = { ...prev };

      if (type === "checkbox") {
        const arr = updated[questionId] || [];
        updated[questionId] = checked
          ? [...arr, value]
          : arr.filter((v) => v !== value);

        if (updated[questionId].length === 0) {
          delete updated[questionId];
        }
      } else {
        updated[questionId] = value;
      }

      return updated;
    });
  };
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

  const handleNextPageButton = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPageButton = () => {
    setPage((prev) => prev - 1);
  };
  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    if (!email) {
      showError("Email is required");
      return;
    }

    const formattedAnswers = questions
      .map((q) => {
        const value = answers[q._id];
        if (!value || (Array.isArray(value) && !value.length)) return null;
        return { questionId: q._id, categoryId: q.categoryId, value };
      })
      .filter(Boolean);

    if (!formattedAnswers.length) {
      showError("Please answer at least one question");
      return;
    }

    try {
      if (existingResponseId) {
        await updateResponse({
          responseId: existingResponseId,
          answers: formattedAnswers,
          email,
        }).unwrap();
        showSuccess("Response updated successfully");
        handleNextPageButton();
        if (!hasMore) {
          window.location.reload();
        }
      } else {
        await createResponse({
          answers: formattedAnswers,
          email,
        }).unwrap();

        showSuccess("Response submitted successfully");
        handleNextPageButton();
        // window.location.reload();
      }
    } catch (error) {
      console.log(error);
      showError("Submission failed");
    }
  };

  const clearSelected = (questionId) => {
    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[questionId];
      return updated;
    });
  };

  // ================= RENDER INPUT =================
  const renderInput = (q) => {
    const value = answers[q._id] || "";
    switch (q.type) {
      case "textarea":
        return (
          <TextField
            fullWidth
            multiline
            rows={3}
            value={value}
            onChange={(e) => handleChange(q._id, e.target.value, "textarea")}
          />
        );
      case "radio":
        return (
          <RadioGroup value={value}>
            {q.options.map((opt) => (
              <FormControlLabel
                key={opt}
                value={opt}
                control={<Radio />}
                label={opt}
                onChange={() => handleChange(q._id, opt, "radio")}
              />
            ))}
          </RadioGroup>
        );
      case "checkbox":
        return (
          <FormGroup>
            {q.options.map((opt) => (
              <FormControlLabel
                key={opt}
                control={
                  <Checkbox
                    checked={Array.isArray(value) && value.includes(opt)}
                    onChange={(e) =>
                      handleChange(q._id, opt, "checkbox", e.target.checked)
                    }
                  />
                }
                label={opt}
              />
            ))}
          </FormGroup>
        );
      case "dropdown":
        return (
          <select
            value={value}
            onChange={(e) => handleChange(q._id, e.target.value, "dropdown")}
          >
            <option value="">Select</option>
            {q.options.map((opt) => (
              <option key={opt} value={opt}>
                <Typography color="text.secondary">{opt}</Typography>
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  // ================= JSX =================
  const SkeletonQuestion = () => (
    <div style={{ marginBottom: "1rem" }}>
      <Skeleton variant="text" width="60%" height={24} />
      <Skeleton variant="rectangular" height={20} sx={{ mt: 1 }} />
    </div>
  );

  // ================= JSX =================
  if (isFetching)
    return (
      <div className="assessment-container">
        <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
        {[...Array(5)].map((_, i) => (
          <SkeletonQuestion key={i} />
        ))}
        <Skeleton variant="rectangular" height={48} width={150} />
      </div>
    );

  function Reload() {
    refetch();
  }

  if (isQuestionsError)
    return (
      <Paper className="assessment-container">
        <Alert severity="error"> Failed to load questions</Alert>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button onClick={Reload} variant="contained" color="primary">
            Reload
          </Button>
        </div>
      </Paper>
    );

  return (
    <Paper className="assessment-container">
      <Typography>
        Enter your email to continue a previous assessment or submit a new one.
      </Typography>
      <div>
        <TextField
          type="email"
          name="email"
          sx={{
            "& .MuiInputBase-input": {
              height: "35px",
              width: "100%",
            },
          }}
          value={formik.values.email}
          placeholder="Enter your email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      {formik.touched.email && formik.errors.email && (
        <Alert severity="error"> {formik.errors.email}</Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="Questions" />
          {/* <Tab label="New Questions" /> */}
        </Tabs>
      </Box>

      <TabPanel value={tab} index={0}>
        <form className="assessment-form">
          {/* <h3 className="assessment-title">Assessment</h3> */}

          {questions.map((q) => (
            <div
              style={{
                backgroundColor: theme.palette.background.paper,
              }}
              key={q._id}
              className="assessment-question"
            >
              <label>
                <strong>{q.label}</strong>
              </label>
              <div className="assessment-input-block">{renderInput(q)}</div>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "flex-end",
                }}
              >
                {answers[q._id] && (
                  <Tooltip title="Clear">
                    {" "}
                    <IconButton
                      onClick={() => {
                        clearSelected(q._id);
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
          ))}
        </form>

        {questions.length > 0 && (
          <Pagination
            page={page}
            limit={limit}
            totalPages={totalPages}
            hasMore={hasMore}
            handleNextPageButton={handleNextPageButton}
            handlePrevPageButton={handlePrevPageButton}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        )}
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <Typography variant="h6">New Questions</Typography>
        <Typography color="text.secondary">
          This section is reserved for adding new questions.
        </Typography>

        <TextField
          fullWidth
          label="Question"
          placeholder="Enter a new question"
          sx={{ mt: 2 }}
        />

        <Button sx={{ mt: 2 }} variant="outlined">
          Add Question
        </Button>
      </TabPanel>

      <div style={{ marginTop: "1rem" }}>
        {!hasMore ? (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loadingSubmit}
            variant="contained"
            color="primary"
          >
            Finished
          </Button>
        ) : (
          <Button
            onClick={() => {
              handleSubmit();
            }}
            disabled={loadingSubmit}
            variant="contained"
          >
            {loadingSubmit ? "Submitting..." : "Save anc continue"}
          </Button>
        )}
      </div>

      <AlertInfo
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />

      {/* Floating counter */}
      <FloatingCounter
        totalInputs={totalPages}
        filledInputs={Object.keys(answers).length}
      />
    </Paper>
  );
}
