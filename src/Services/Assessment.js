import { API_URL } from "./api";

async function CreateResponse(formattedAnswers, email) {
  const res = await fetch(`${API_URL}/responses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ answers: formattedAnswers, email }),
  });

  return await res.json();
}

async function UpdateResponse(responseId, answers, email) {
  try {
    const res = await fetch(`${API_URL}/responses/${responseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        answers,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to update response");
    }

    return await res.json();
  } catch (error) {
    console.error("UpdateResponse error:", error);
    throw error;
  }
}

async function GetResponseByEmail(email) {
  try {
    const res = await fetch(`${API_URL}/responses/email`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch response: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("GetResponseByEmail error:", error);
    throw error;
  }
}

export { CreateResponse, GetResponseByEmail, UpdateResponse };
