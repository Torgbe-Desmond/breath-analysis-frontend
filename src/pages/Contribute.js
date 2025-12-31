import { useEffect, useState } from "react";
import "../App.css";
import "./Contribute.css";
import { handlePostQuestion } from "../Services/Contribute";

export default function Contribute({ categories, setQuestions }) {
  const [label, setLabel] = useState("");
  const [type, setType] = useState("");
  const [options, setOptions] = useState("");
  const [categoryId, setCategoryId] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const field = {
        label,
        type,
        categoryId,
        options:
          type === "checkbox" || type === "radio" || type === "dropdown"
            ? options.split(",").map((o) => o.trim())
            : [],
      };

      const response = await handlePostQuestion([field]);
      console.log("response", response);

      if (response?.success) {
        setQuestions((prev) => [...response.questions, ...prev]);
        alert("Field created successfully");

        // reset form only
        setLabel("");
        setType("");
        setOptions("");
        setCategoryId("");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <section className="contribute-container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter field label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
        />

        <select value={type} onChange={(e) => setType(e.target.value)} required>
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
    </section>
  );
}
