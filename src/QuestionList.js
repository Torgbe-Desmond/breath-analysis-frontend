import React from "react";
import {
  Box,
  Card,
  CardContent,
  List,
  ListItemButton,
  Typography,
  Chip,
  Stack,
} from "@mui/material";

function QuestionList({
  setLoadResponseModalOpen,
  questions,
  setSearchValue,
  setResTotalPages,
  setQuestionLabel,
  setQuestionId,
}) {
  return (
    <Box>
      {questions.map((q) => (
        <Card
          key={q._id || q.questionId}
          sx={{
            mb: 2,
            borderRadius: 2,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            border: "1px solid #ddd",
          }}
        >
          <CardContent>
            {/* Question label */}
            <Typography fontWeight={600} sx={{ mb: 1 }}>
              {q.label}
            </Typography>

            {/* Answers */}
            <List sx={{ pl: 2 }}>
              {q.type === "checkbox" || q.type === "radio"
                ? q.options.map((opt) => (
                    <ListItemButton
                      key={opt}
                      sx={{
                        mb: 0.5,
                        px: 1.5,
                        py: 0.75,
                        borderRadius: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        transition: "background-color 0.2s ease",
                      }}
                      onClick={() => {
                        setLoadResponseModalOpen(true);
                        setSearchValue(opt);
                        setResTotalPages(q.answers?.[opt] || 0);
                        setQuestionLabel(q.label);
                        setQuestionId(q._id);
                      }}
                    >
                      <Typography
                        sx={{
                          textDecoration: "underline",
                          fontSize: "0.95rem",
                        }}
                      >
                        {opt}
                      </Typography>

                      <Chip
                        label={q.answers?.[opt] || 0}
                        size="small"
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "monospace",
                          minWidth: 32,
                        }}
                      />
                    </ListItemButton>
                  ))
                : q.answers.map((a, i) => (
                    <ListItemButton
                      key={i}
                      sx={{
                        mb: 0.5,
                        px: 1.5,
                        py: 0.75,
                        borderRadius: 1,
                        "&:hover": { backgroundColor: "#f5f5f5" },
                      }}
                    >
                      <Typography fontSize="0.95rem">{a}</Typography>
                    </ListItemButton>
                  ))}
            </List>

            {/* Footer */}
            <Typography
              variant="caption"
              sx={{ display: "block", mt: 1.5, color: "text.secondary" }}
            >
              Total responses: {q.totalResponses}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default QuestionList;
