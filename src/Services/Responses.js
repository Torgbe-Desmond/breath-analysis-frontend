import { API_URL } from "./api";

async function getAllResponses() {
  const response = await fetch(`${API_URL}/responses`);
  return await response.json();
}

async function getResponseByValue(value, page = 1, limit = 3) {
  const response = await fetch(
    `${API_URL}/responses/search?page=${page}&limit=${limit}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    }
  );

  return await response.json();
}

async function getResponseById(id) {
  const response = await fetch(`${API_URL}/responses/search/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch responses");
  }

  return await response.json();
}

export { getAllResponses, getResponseByValue, getResponseById };
