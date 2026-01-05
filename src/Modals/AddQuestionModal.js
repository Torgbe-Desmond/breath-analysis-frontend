import { Box, Modal } from "@mui/material";
import { useState } from "react";

const STORAGE_KEY = "draft_questions";

export default function AddQuestionModals({
  modalAddOpen,
  setAddModalOpen,
  categories,
  setDrafts,
}) {
  const [label, setLabel] = useState("");
  const [type, setType] = useState("");
  const [options, setOptions] = useState("");
  const [categoryId, setCategoryId] = useState("");

  /* ================= ADD DRAFT ================= */
  const addDraft = (e) => {
    e.preventDefault();

    const draft = {
      id: crypto.randomUUID(),
      label,
      type,
      categoryId,
      options: ["radio", "checkbox", "dropdown"].includes(type)
        ? options.split(",").map((o) => o.trim())
        : [],
    };

    let old = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!old) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([draft]));
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...old, draft]));

    // setDrafts((prev) => [...prev, draft]);

    // reset form
    setLabel("");
    setType("");
    setOptions("");
    setCategoryId("");
    setAddModalOpen(false);
  };

  return (
    <Modal open={modalAddOpen} onClose={() => setAddModalOpen(false)}>
      <Box
        className="modal-pop-up"
        sx={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 320, sm: 400, md: 600 },
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <form onSubmit={addDraft} style={{ display: "grid", gap: "1rem" }}>
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
            {categories?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <button className="btn" type="submit">
            Add to Drafts
          </button>
        </form>
      </Box>
    </Modal>
  );
}
