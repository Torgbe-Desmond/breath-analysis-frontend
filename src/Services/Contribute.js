import { API_URL } from "./api";

async function handleGetCategories() {
  const res = await fetch(`${API_URL}/categories`, {
    credentials: "include", // added
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();
  return data;
}

async function handleGetQuestions() {
  const res = await fetch(`${API_URL}/questions`, {
    credentials: "include", // added
  });
  return await res.json();
}

async function handlePostQuestion(field) {
  const res = await fetch(`${API_URL}/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // added
    body: JSON.stringify(field),
  });

  if (!res.ok) {
    throw new Error("Failed to create question");
  }

  return await res.json();
}

async function handleDeleteQuestion(id) {
  const res = await fetch(`${API_URL}/questions/${id}`, {
    method: "DELETE",
    credentials: "include", // added
  });
  return await res.json();
}

async function handleUpdateQuestion(id, data) {
  const res = await fetch(`${API_URL}/questions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // added
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
