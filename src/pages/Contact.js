import { useState } from "react";
import {
  Box,
  Button,
  Snackbar,
  Alert,
  TextField,
  Typography,
} from "@mui/material";
import "./Contribute.css";

function Contact() {
  const [feedback, setFeedback] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleSubmit = () => {
    if (!feedback.trim()) {
      setErrorOpen(true);
      return;
    }

    setFeedback("");
    setSuccessOpen(true);
  };

  return (
    <Box
      className="contribute-container "
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
      <Typography variant="h4" fontWeight="bold">
        Send a Feedback
      </Typography>

      <Typography color="text.secondary">
        Share your feedback, suggestions, or thoughts about the Bad Breath
        Analysis platform. Your feedback helps improve the experience.
      </Typography>

      <textarea
        placeholder="Your feedback"
        rows={5}
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
        className="btn"
        variant="contained"
        onClick={handleSubmit}
        sx={{ alignSelf: "flex-start" }}
      >
        Send Feedback
      </Button>

      {/* Success Snackbar */}
      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
      >
        <Alert severity="success" onClose={() => setSuccessOpen(false)}>
          Feedback sent successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={errorOpen}
        autoHideDuration={3000}
        onClose={() => setErrorOpen(false)}
      >
        <Alert severity="error" onClose={() => setErrorOpen(false)}>
          Please enter some feedback before submitting.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Contact;
