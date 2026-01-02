import { useEffect, useState } from "react";
import "./Contribute.css";
import { handlePostQuestion } from "../Services/Contribute";
import Filter from "../Filter";
import AddQuestionModals from "../Modals/AddQuestionModal";
import DraftQuestions from "../DraftQuestions";
import { Button } from "@mui/material";

const STORAGE_KEY = "draft_questions";

export default function Contribute({ categories, setQuestions }) {
  const [drafts, setDrafts] = useState([]);
  const [modalAddOpen, setAddModalOpen] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [search, setSearch] = useState("");

  /* ================= SYNC DRAFTS TO LOCAL STORAGE ================= */
  // useEffect(() => {
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  // }, [drafts]);

  /* ================= LOAD DRAFTS FROM LOCAL STORAGE ================= */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setDrafts(JSON.parse(saved));
    }
  }, []);

  function Remove(id) {
    let questions = JSON.parse(localStorage.getItem(STORAGE_KEY));
    let filteredQuestions = questions.filter((q) => q.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredQuestions));
    setDrafts(filteredQuestions);
  }

  /* ================= SUBMIT ALL DRAFTS ================= */
  const submitAllDrafts = async () => {
    if (!drafts.length) {
      alert("No draft questions to submit");
      return;
    }

    try {
      const response = await handlePostQuestion(drafts);

      if (response?.data) {
        setQuestions((prev) => [...response.data, ...prev]);
        setDrafts([]);
        localStorage.removeItem(STORAGE_KEY);
        alert("All questions submitted successfully");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit drafts");
    }
  };

  const filterProps = {
    setAddModalOpen,
    search,
    setSearch,
    filterType,
    setFilterType,
  };

  return (
    <section>
      {/* ================= FILTER / HEADER ================= */}
      <Filter {...filterProps} />

      {/* ================= ADD QUESTION MODAL ================= */}
      <AddQuestionModals
        modalAddOpen={modalAddOpen}
        setAddModalOpen={setAddModalOpen}
        categories={categories}
        setDrafts={setDrafts}
      />

      {/* ================= DRAFT  PREVIEW ================= */}
      <DraftQuestions
        drafts={JSON.parse(localStorage.getItem(STORAGE_KEY))}
        setDrafts={setDrafts}
        submitAll={submitAllDrafts}
        Remove={Remove}
      />
      {drafts.length > 0 && (
        <Button
          onClick={() => {
            submitAllDrafts();
          }}
          variant="contained"
          className="btn"
        >
          Submit All
        </Button>
      )}
    </section>
  );
}
