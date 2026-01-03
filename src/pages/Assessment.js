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
  Button,
  CircularProgress,
  IconButton,
  Skeleton,
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

const emailSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

export default function Assessment() {
  const [answers, setAnswers] = useState({});
  const [existingResponseId, setExistingResponseId] = useState(null);

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
  } = useHandleGetQuestionsQuery();

  const questions = questionsData?.data || [];

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

    const mapped = {};
    answers.forEach((a) => {
      mapped[a.questionId] = a.value;
    });
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
        window.location.reload();
      } else {
        console.log("formattedAnswers", formattedAnswers);
        await createResponse({
          answers: formattedAnswers,
          email,
        }).unwrap();

        showSuccess("Response submitted successfully");
        window.location.reload();
      }
    } catch {
      showError("Submission failed");
    }
  };

  // ================= RENDER INPUT =================
  const renderInput = (q) => {
    const value = answers[q._id] || "";
    switch (q.type) {
      case "textarea":
        return (
          <textarea
            rows={3}
            value={value}
            onChange={(e) => handleChange(q._id, e.target.value, "textarea")}
          />
        );
      case "radio":
        return q.options.map((opt) => (
          <label className="label" key={opt}>
            {" "}
            <input
              type="radio"
              name={q._id}
              checked={value === opt}
              onChange={() => handleChange(q._id, opt, "radio")}
            />
            <span>{opt}</span>
          </label>
        ));
      case "checkbox":
        return q.options.map((opt) => (
          <label className="label" key={opt}>
            <input
              type="checkbox"
              checked={Array.isArray(value) && value.includes(opt)}
              onChange={(e) =>
                handleChange(q._id, opt, "checkbox", e.target.checked)
              }
            />
            <span>{opt}</span>
          </label>
        ));
      case "dropdown":
        return (
          <select
            value={value}
            onChange={(e) => handleChange(q._id, e.target.value, "dropdown")}
          >
            <option value="">Select</option>
            {q.options.map((opt) => (
              <option key={opt} value={opt}>
                <span>{opt}</span>
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
      <div className="assessment-container">
        <Alert severity="error"> Failed to load questions</Alert>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            className="assessment-btn"
            onClick={Reload}
            variant="contained"
            color="primary"
          >
            Reload
          </Button>
        </div>
      </div>
    );

  return (
    <div className="assessment-container">
      <h3 className="assessment-title">Assessment</h3>
      <p>
        Enter your email to continue a previous assessment or submit a new one.
      </p>

      <form className="assessment-form">
        <div>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            placeholder="Enter your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <Alert severity="error"> {formik.errors.email}</Alert>
        )}
        {questions.map((q) => (
          <div key={q._id} className="assessment-question">
            <label>
              <strong>{q.label}</strong>
            </label>
            <div className="assessment-input-block">{renderInput(q)}</div>
          </div>
        ))}
      </form>

      <div style={{ marginTop: "1rem" }}>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={loadingSubmit}
          variant="contained"
          color="primary"
          className="assessment-btn"
        >
          {loadingSubmit
            ? "Submitting..."
            : existingResponseId
            ? "Update Response"
            : "Submit Response"}
        </Button>
      </div>

      <AlertInfo
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />

      {/* Floating counter */}
      <FloatingCounter
        totalInputs={questions.length}
        filledInputs={Object.keys(answers).length}
      />
    </div>
  );
}
