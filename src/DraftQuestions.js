import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import "./pages/Contribute.css";

const STORAGE_KEY = "draft_questions";

function DraftQuestions({ drafts, Remove }) {
  return (
    <div>
      {drafts?.map((q) => (
        <div
          key={q.id}
          className="assessment-question"
          style={{ marginBottom: "1rem" }}
        >
          <label>
            <strong>{q.label}</strong>
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
            {Array.isArray(q.options) ? (
              q.options.map((val, i) => (
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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <div className="question-actions">
              {/* <IconButton>
                <EditIcon />
              </IconButton> */}
              <IconButton onClick={() => Remove(q.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DraftQuestions;
