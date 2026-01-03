import { useState } from "react";
import {
  Box,
  Button,
  Snackbar,
  Alert,
  Typography,
  Paper,
} from "@mui/material";
import "./Contribute.css";
import { useHandleCreateFeedbackMutation } from "../features/feedbackApi";

function Contact() {
  const [feedback, setFeedback] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [handleCreateFeedback, { isLoading }] =
    useHandleCreateFeedbackMutation();

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      setErrorMessage("Please enter some feedback before submitting.");
      setErrorOpen(true);
      return;
    }

    try {
      await handleCreateFeedback({ message: feedback }).unwrap();

      setFeedback("");
      setSuccessOpen(true);
    } catch (err) {
      console.error("Feedback error:", err);
      setErrorMessage(
        err?.data?.message || "Failed to send feedback. Please try again."
      );
      setErrorOpen(true);
    }
  };

  return (
    <Paper
      className="contribute-container"
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 6,
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography color="text.secondary">
        Share your feedback, suggestions, or thoughts about the Bad Breath
        Analysis platform. Your feedback helps improve the experience.
      </Typography>

      <textarea
        placeholder="Your feedback"
        rows={5}
        value={feedback}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
        onChange={(e) => setFeedback(e.target.value)}
      />

      <Button
        className="assessment-btn"
        variant="contained"
        onClick={handleSubmit}
        disabled={isLoading}
        sx={{ alignSelf: "flex-start" }}
      >
        {isLoading ? "Sending..." : "Send Feedback"}
      </Button>

      {/* Success Snackbar */}
      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
      >
        <Alert
          severity="success"
          onClose={() => setSuccessOpen(false)}
        >
          Feedback sent successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={errorOpen}
        autoHideDuration={3000}
        onClose={() => setErrorOpen(false)}
      >
        <Alert
          severity="error"
          onClose={() => setErrorOpen(false)}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default Contact;
