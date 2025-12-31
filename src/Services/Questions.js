async function getQuestionsByCategory(
  selectedCategoryId,
  page = 1,
  limit = 10
) {
  try {
    const response = await fetch(
      `http://localhost:3000/questions/${selectedCategoryId}/insights?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
