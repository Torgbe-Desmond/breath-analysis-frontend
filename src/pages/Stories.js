import { useState } from "react";
import "./Stories.css";

export default function Stories() {
  const [timeline, setTimeline] = useState([
    { year: "", duration: "", symptoms: "", treatments: "", outcome: "" },
  ]);

  const addEntry = () => {
    setTimeline([
      ...timeline,
      { year: "", duration: "", symptoms: "", treatments: "", outcome: "" },
    ]);
  };

  const removeEntry = (index) => {
    setTimeline(timeline.filter((_, i) => i !== index));
  };

  const updateEntry = (index, field, value) => {
    const updated = [...timeline];
    updated[index][field] = value;
    setTimeline(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const structuredTimeline = timeline.map((entry) => ({
      ...entry,
      symptoms: entry.symptoms.split(",").map((s) => s.trim()),
      treatments: entry.treatments.split(",").map((t) => t.trim()),
    }));

    console.log("Submitted Story:", structuredTimeline);
    alert("Story submitted! Check console for output.");

    // reset form
    setTimeline([
      { year: "", duration: "", symptoms: "", treatments: "", outcome: "" },
    ]);
  };

  return (
    <div className="stories-container">
      <h2>Share Your Experience</h2>
      <form onSubmit={handleSubmit}>
        {timeline.map((entry, idx) => (
          <div key={idx} className="timeline-entry">
            <h4>Entry {idx + 1}</h4>
            <input
              type="text"
              placeholder="Year"
              value={entry.year}
              onChange={(e) => updateEntry(idx, "year", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Duration (e.g., 6 months)"
              value={entry.duration}
              onChange={(e) => updateEntry(idx, "duration", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Symptoms (comma separated)"
              value={entry.symptoms}
              onChange={(e) => updateEntry(idx, "symptoms", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Treatments (comma separated)"
              value={entry.treatments}
              onChange={(e) => updateEntry(idx, "treatments", e.target.value)}
            />
            <input
              type="text"
              placeholder="Outcome / Cure"
              value={entry.outcome}
              onChange={(e) => updateEntry(idx, "outcome", e.target.value)}
            />
            {timeline.length > 1 && (
              <button type="button" onClick={() => removeEntry(idx)} className="remove-btn">
                Remove Entry
              </button>
            )}
            <hr />
          </div>
        ))}
        <button type="button" onClick={addEntry} className="add-btn">
          Add Another Entry
        </button>
        <button type="submit" className="submit-btn">
          Submit Story
        </button>
      </form>
    </div>
  );
}
