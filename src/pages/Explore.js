import { useMemo, useState } from "react";
// import "./Explore.css";

export default function Explore({ categories = [], responses = [] }) {
  /**
   * activeFilters shape:
   * {
   *   questionId1: ["opt1", "opt2"],
   *   questionId2: ["opt3"]
   * }
   */
  const [activeFilters, setActiveFilters] = useState({});

  const handleCheckboxChange = (questionId, value, checked) => {
    setActiveFilters((prev) => {
      const updated = { ...prev };

      if (!updated[questionId]) updated[questionId] = [];

      if (checked) {
        updated[questionId].push(value);
      } else {
        updated[questionId] = updated[questionId].filter((v) => v !== value);
        if (updated[questionId].length === 0) {
          delete updated[questionId];
        }
      }

      return updated;
    });
  };

  /**
   * Filter responses (same logic as your script)
   */
  const filteredResponses = useMemo(() => {
    if (Object.keys(activeFilters).length === 0) return responses;

    return responses.filter((response) => {
      return response.answers.every((ans) => {
        const filtersForQuestion = activeFilters[ans.questionId];
        if (!filtersForQuestion) return true;

        const values = Array.isArray(ans.value) ? ans.value : [ans.value];
        return values.some((v) => filtersForQuestion.includes(v));
      });
    });
  }, [responses, activeFilters]);

  return (
    <main className="explore-container">
      {/* FILTER PANEL */}
      <aside className="filter-panel">
        <h3>Filter Cases</h3>

        {categories.map((category) => (
          <div key={category._id} className="filter-group">
            <h4>{category.name}</h4>

            <div className="filter-options">
              {category.questionIds.map((question) =>
                question.options?.length
                  ? question.options.map((opt) => (
                      <label key={opt}>
                        <input
                          type="checkbox"
                          checked={
                            activeFilters[question._id]?.includes(opt) || false
                          }
                          onChange={(e) =>
                            handleCheckboxChange(
                              question._id,
                              opt,
                              e.target.checked
                            )
                          }
                        />
                        {opt}
                      </label>
                    ))
                  : null
              )}
            </div>
          </div>
        ))}
      </aside>

      {/* RESULTS GRID */}
      <section className="results-grid">
        {filteredResponses.map((response, idx) => (
          <div key={response._id} className="case-card">
            <h4>Case #{idx + 1}</h4>

            {response.answers.map((ans) => {
              const category = categories.find(
                (c) => c._id === ans.categoryId
              );

              return (
                <p key={ans.questionId}>
                  <strong>{category?.name ?? "Unknown"}:</strong>{" "}
                  {Array.isArray(ans.value)
                    ? ans.value.join(", ")
                    : ans.value}
                </p>
              );
            })}
          </div>
        ))}
      </section>
    </main>
  );
}
