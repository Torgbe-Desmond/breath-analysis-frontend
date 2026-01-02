import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import "./pages/Contribute.css";

function Question({
  handleEdit,
  expanded,
  handleOpenDeleteModal,
  question,
  handleExpand,
}) {
  return (
    <div
      
    >
      <div key={question._id} className="question-card">
        <div className="question-header">
          <IconButton onClick={() => handleExpand(question._id)}>
            {expanded === question._id ? (
              <ExpandLessIcon />
            ) : (
              <ExpandMoreIcon />
            )}
          </IconButton>
          <span className="question-label">{question.label}</span>
          <div className="question-actions">
            <IconButton onClick={() => handleEdit(question)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleOpenDeleteModal(question._id)}>
              <DeleteIcon />
            </IconButton>
          </div>  
        </div>

        {expanded === question._id && (
          <div className="question-options">
            {question.options.length > 0 ? (
              question.options.map((opt, idx) => (
                <div className="option" key={idx}>
                  {" "}
                  {opt}
                </div>
              ))
            ) : (
              <div>No options</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Question;
