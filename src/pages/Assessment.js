import { useEffect, useState } from "react";
import "./Assessment.css";
import { handleGetQuestions } from "../Services/Contribute";
import {
  CreateResponse,
  GetResponseByEmail,
  UpdateResponse,
} from "../Services/Assessment";
import AlertInfo from "../AlertInfo";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export default function Assessment() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState("");
  const [existingResponseId, setExistingResponseId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isError, setIsError] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  /* ================= ALERTS ================= */

  const showSuccess = (message) => {
    setSnackbar({ open: true, message, severity: "success" });
  };

  const showError = (message) => {
    setSnackbar({ open: true, message, severity: "error" });
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  /* ================= LOAD QUESTIONS ================= */

  async function fetchQuestions() {
    try {
      setLoading(true);
      const response = await handleGetQuestions();
      if (response?.data) {
        setQuestions(response.data);
      }
    } catch (err) {
      console.error(err);
      setIsError(true);
      showError("Failed to load questions");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  /* ================= FETCH OLD RESPONSE BY EMAIL ================= */

  useEffect(() => {
    if (!email) return;

    console.log(email);

    const delay = setTimeout(async () => {
      try {
        const res = await GetResponseByEmail(email);
        console.log("byEmail", res);

        if (res?.data) {
          const { _id, answers } = res.data;

          setExistingResponseId(_id);

          // Convert answers array → object map
          const mappedAnswers = {};
          answers.forEach((a) => {
            mappedAnswers[a.questionId] = a.value;
          });

          setAnswers(mappedAnswers);
        }
      } catch (err) {
        // no existing response is OK
        setExistingResponseId(null);
        setAnswers({});
      }
    }, 600); // debounce email input

    return () => clearTimeout(delay);
  }, [email]);

  /* ================= HANDLE INPUT ================= */

  const handleChange = (questionId, value, type, checked) => {
    setAnswers((prev) => {
      const updated = { ...prev };

      if (type === "checkbox") {
        const arr = updated[questionId] || [];
        updated[questionId] = checked
          ? [...arr, value]
          : arr.filter((v) => v !== value);

        if (updated[questionId].length === 0) delete updated[questionId];
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
        if (!value || (Array.isArray(value) && value.length === 0)) return null;

        return {
          questionId: q._id,
          categoryId: q.categoryId,
          value,
        };
      })
      .filter(Boolean);

    if (formattedAnswers.length === 0) {
      showError("Please answer at least one question");
      return;
    }

    try {
      setLoadingSubmit(true);

      if (existingResponseId) {
        await UpdateResponse(existingResponseId, formattedAnswers);
        showSuccess("Response updated successfully");
      } else {
        await CreateResponse(formattedAnswers, email);
        showSuccess("Response submitted successfully");
      }

      window.location.reload();
    } catch (err) {
      console.error(err);
      showError("Submission failed");
    } finally {
      setLoadingSubmit(false);
    }
  };

  /* ================= RENDER INPUT ================= */

  const renderInput = (q) => {
    const value = answers[q._id];

    switch (q.type) {
      case "textarea":
        return (
          <textarea
            rows={3}
            value={value || ""}
            onChange={(e) => handleChange(q._id, e.target.value, "textarea")}
          />
        );

      case "radio":
        return q.options.map((opt) => (
          <label key={opt}>
            <input
              type="radio"
              name={q._id}
              checked={value === opt}
              onChange={() => handleChange(q._id, opt, "radio")}
            />
            {opt}
          </label>
        ));

      case "checkbox":
        return q.options.map((opt) => (
          <label key={opt}>
            <input
              type="checkbox"
              checked={Array.isArray(value) && value.includes(opt)}
              onChange={(e) =>
                handleChange(q._id, opt, "checkbox", e.target.checked)
              }
            />
            {opt}
          </label>
        ));

      case "dropdown":
        return (
          <select
            value={value || ""}
            onChange={(e) => handleChange(q._id, e.target.value, "dropdown")}
          >
            <option value="">Select</option>
            {q.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      default:
        return null;
    }
  };

  /* ================= JSX ================= */

  return (
    <div className="assessment-container">
      <h3 className="assessment-title">Assessment</h3>

      <p>
        Enter your email to continue a previous assessment or submit a new one.
      </p>

      <div style={{ display: "flex", gap: "1.5rem" }}>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {
          <IconButton
            onClick={() => {
              setEmail("");
              setAnswers({});
            }}
          >
            <ClearIcon />
          </IconButton>
        }
      </div>

      {loading && <p>Loading questions...</p>}

      <form className="assessment-form">
        {questions.map((q) => (
          <div key={q._id} className="assessment-question">
            <label>
              <strong>{q.label}</strong>
            </label>
            <div className="assessment-input-block">{renderInput(q)}</div>
          </div>
        ))}
      </form>

      <button
        type="button"
        className="assessment-btn"
        onClick={handleSubmit}
        disabled={loadingSubmit}
      >
        {loadingSubmit
          ? "Submitting..."
          : existingResponseId
          ? "Update Response"
          : "Submit Response"}
      </button>

      <AlertInfo
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
    </div>
  );
}
