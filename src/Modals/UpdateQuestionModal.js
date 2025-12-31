import { Box, Modal } from "@mui/material";
import {
  handlePostQuestion,
  handleUpdateQuestion,
} from "../Services/Contribute";

function UpdateQuestionModals({
  label,
  type,
  options,
  categoryId,
  setLabel,
  setType,
  setOptions,
  categories,
  setCategoryId,
  setQuestions,
  setModalOpen,
  modalOpen,
  questions,
  editingQuestion,
  setEditingQuestion,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedQuestion = {
      ...editingQuestion,
      label,
      type,
      categoryId,
      options:
        type === "checkbox" || type === "radio" || type === "dropdown"
          ? options.split(",").map((o) => o.trim())
          : [],
    };

    try {
      const res = await handleUpdateQuestion(
        editingQuestion?._id,
        updatedQuestion
      );
      setQuestions(
        questions.map((q) => (q?._id === editingQuestion._id ? res : q))
      );
      setModalOpen(false);
      setEditingQuestion(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <Box
        className="modal-pop-up"
        sx={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { sx: 400, lg: 600 },
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          <input
            type="text"
            placeholder="Enter field label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            required
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select field type</option>
            <option value="text">Text</option>
            <option value="textarea">Textarea</option>
            <option value="radio">Radio</option>
            <option value="checkbox">Checkbox</option>
            <option value="dropdown">Dropdown</option>
          </select>

          {(type === "checkbox" || type === "radio" || type === "dropdown") && (
            <input
              type="text"
              placeholder="Separate options with commas"
              value={options}
              onChange={(e) => setOptions(e.target.value)}
            />
          )}

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select category</option>
            {Array.isArray(categories) &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>

          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </Box>
    </Modal>
  );
}

export default UpdateQuestionModals;
