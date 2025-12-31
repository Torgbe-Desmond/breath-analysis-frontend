const API_URL = "http://localhost:3000";

async function handleGetCategories() {
  const res = await fetch(`${API_URL}/categories`);

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();

  return data;
}

async function handleGetQuestions() {
  const res = await fetch(`${API_URL}/questions`);
  return await res.json();
}

async function handlePostQuestion(field) {
  const res = await fetch(`${API_URL}/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(field),
  });

  if (!res.ok) {
    throw new Error("Failed to create question");
  }

  return await res.json();
}

async function handleDeleteQuestion(id) {
  const res = await fetch(`${API_URL}/questions/${id}`, { method: "DELETE" });
  return await res.json();
}

async function handleUpdateQuestion(id, data) {
  const res = await fetch(`${API_URL}/questions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export {
  handleGetCategories,
  handleGetQuestions,
  handlePostQuestion,
  handleDeleteQuestion,
  handleUpdateQuestion,
};
