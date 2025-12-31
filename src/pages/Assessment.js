import { useEffect, useState } from "react";
import "./Assessment.css";
import { handleGetQuestions } from "../Services/Contribute";
import { CreateResponse } from "../Services/Assessment";
import { Button } from "@mui/material";
import AlertInfo from "../AlertInfo";

export default function Assessment() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
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

  /* ================= LOAD QUESTIONS ================= */

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        const response = await handleGetQuestions();
        if (response.data) {
          setQuestions(response.data);
        }
      } catch (err) {
        setLoading(false);
        setIsError(true);
        showError("Server error. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

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
      showError("Please answer at least one question.");
      return;
    }

    try {
      const response = await CreateResponse(formattedAnswers, email);
      if (response.data) {
        showSuccess("Assessment submitted successfully!");
        window.location.reload(); // fixed
      } else {
        showError("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      showError("Server error. Please try again later.");
    }
  };

  /* ================= RENDER INPUT ================= */

  const renderInput = (q) => {
    switch (q.type) {
      case "textarea":
        return (
          <textarea
            rows={3}
            onChange={(e) => handleChange(q._id, e.target.value, "textarea")}
          />
        );

      case "radio":
        return q.options.map((opt) => (
          <label key={opt}>
            <input
              type="radio"
              name={q._id}
              value={opt}
              onChange={(e) =>
                handleChange(q._id, opt, "radio", e.target.checked)
              }
            />
            {opt}
          </label>
        ));

      case "checkbox":
        return q.options.map((opt) => (
          <label key={opt}>
            <input
              type="checkbox"
              value={opt}
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
            defaultValue=""
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

      {loading && <p style={{ textAlign: "center" }}>Loading assessments...</p>}

      {questions.length > 0 ? (
        <>
          <p>
            We will send you a message when there are new questions to ask. You
            can access your response using your email
          </p>{" "}
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Add your email here"
          />
          <form className="assessment-form">
            {questions?.map((q) => (
              <div key={q._id} className="assessment-question">
                <label>
                  <strong>{q.label}</strong>
                </label>

                <div className="assessment-input-block">{renderInput(q)} </div>
              </div>
            ))}
          </form>
          {questions.length > 0 && (
            <div>
              <button
                type="button"
                className="assessment-btn"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          )}
        </>
      ) : (
        isError && (
          <div>
            <Button>Reload</Button>
          </div>
        )
      )}
      <AlertInfo
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
    </div>
  );
}
