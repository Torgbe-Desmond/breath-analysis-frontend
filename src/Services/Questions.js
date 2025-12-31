import { API_URL } from "./api";

async function getQuestionsByCategory(
  selectedCategoryId,
  page = 1,
  limit = 10
) {
  try {
    const response = await fetch(
      `${API_URL}/questions/${selectedCategoryId}/insights?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // added
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch exploration data");
    }

    return await response.json();
  } catch (error) {
    console.error("getExploration error:", error);
    throw error;
  }
}

export { getQuestionsByCategory };
