import { API_URL } from "./api";

async function CreateResponse(formattedAnswers, email) {
  const res = await fetch(`${API_URL}/responses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers: formattedAnswers, email }),
  });

  return await res.json();
}

export { CreateResponse };
