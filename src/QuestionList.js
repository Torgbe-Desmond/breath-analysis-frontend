import { List, ListItem, Typography } from "@mui/material";
import React from "react";

function QuestionList({
  setLoadResponseModalOpen,
  questions,
  setSearchValue,
  setResTotalPages
}) {
  const questionCardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    margin: "10px 0",
    padding: "15px",
    backgroundColor: "#fafafa",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  };

  const listItemStyle = {
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
    "&:hover": { backgroundColor: "#f5f5f5" },
  };

  return (
    <div>
      {questions.map((q) => (
        <div key={q._id || q.questionId} style={questionCardStyle}>
          <Typography fontWeight={600} sx={{ mb: 1 }}>
            {q.label}
          </Typography>

          <div style={{ paddingLeft: 15 }}>
            {q.type === "checkbox" || q.type === "radio" ? (
              <List
                sx={{
                  display: "grid",
                  listStyleType: "disc",
                  paddingLeft: 2,
                  gap: 0.5,
                }}
              >
                {q.options.map((opt) => (
                  <ListItem
                    key={opt}
                    sx={listItemStyle}
                    onClick={() => {
                      setLoadResponseModalOpen(true);
                      setSearchValue(opt);
                      setResTotalPages(q.answers[opt] || 0)
                    }}
                  >
                    <span style={{ textDecoration: "underline" }}>{opt}</span>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontFamily: "monospace",
                        background: "#eee",
                        padding: "2px 8px",
                        borderRadius: 12,
                        minWidth: 32,
                        textAlign: "center",
                      }}
                    >
                      {q.answers[opt] || 0}
                    </span>
                  </ListItem>
                ))}
              </List>
            ) : (
              <List
                sx={{
                  display: "grid",
                  listStyleType: "disc",
                  paddingLeft: 2,
                  gap: 0.5,
                }}
              >
                {q.answers.map((a, i) => (
                  <ListItem key={i} sx={listItemStyle}>
                    {a}
                  </ListItem>
                ))}
              </List>
            )}
          </div>
          <small style={{ display: "block", marginTop: 10, color: "#555" }}>
            Total responses: {q.totalResponses}
          </small>
        </div>
      ))}
    </div>
  );
}

export default QuestionList;
