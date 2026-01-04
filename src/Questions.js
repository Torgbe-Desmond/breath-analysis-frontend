import { useEffect, useState } from "react";
import {
  IconButton,
  Modal,
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Skeleton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  handleGetCategories,
  handleGetQuestions,
  handlePostQuestion,
  handleDeleteQuestion,
  handleUpdateQuestion,
} from "./Services/Contribute";
import "./pages/Contribute.css";
import DeleteQuestionModals from "./Modals/DeleteQuestionModal";
import Question from "./Question";
import UpdateQuestionModals from "./Modals/UpdateQuestionModal";
import Filter from "./Filter";
import AddQuestionModals from "./Modals/AddQuestionModal";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Questions({
  categories,
  questions,
  setQuestions,
  handlePrevPage,
  handleNextPage,
  hasMore,
  page,
  totalQuestions,
  loading,
}) {
  const [label, setLabel] = useState("");
  const [type, setType] = useState("");
  const [options, setOptions] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAddOpen, setAddModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  const handleEdit = (q) => {
    setEditingQuestion(q);
    setLabel(q.label);
    setType(q.type);
    setOptions(q.options.join(","));
    setCategoryId(q.categoryId);
    setModalOpen(true);
  };

  const handleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const confirmDelete = async () => {
    if (!questionToDelete) return;

    try {
      await handleDeleteQuestion(questionToDelete);
      setQuestions(questions.filter((q) => q._id !== questionToDelete));
      setDeleteModalOpen(false);
      setQuestionToDelete(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenDeleteModal = (q) => {
    console.log("delete", q);
    setQuestionToDelete(q);
    setDeleteModalOpen(true);
  };

  const filteredQuestions = questions.filter((q) => {
    const matchesType = filterType ? q.type === filterType : true;
    const matchesSearch = search
      ? q?.label?.toLowerCase().includes(search?.toLowerCase())
      : true;

    return matchesType && matchesSearch;
  });

  const deleteQuestionProps = {
    deleteModalOpen,
    setDeleteModalOpen,
    confirmDelete,
    questionToDelete,
  };

  const questionsProps = {
    handleEdit,
    expanded,
    handleOpenDeleteModal,
    handleExpand,
  };

  const updateQuestionsModalProps = {
    label,
    type,
    options,
    categoryId,
    setLabel,
    setType,
    setOptions,
    categories,
    setCategoryId,
    setQuestions,
    setModalOpen,
    modalOpen,
    questions,
    editingQuestion,
    setEditingQuestion,
  };

  const filterProps = {
    setAddModalOpen,
    setSearch,
    search,
    setFilterType,
    filterType,
  };

  const addQuestionModalProps = {
    setAddModalOpen,
    modalAddOpen,
    setQuestions,
    categories,
  };

  const SkeletonQuestion = () => (
    <div style={{ marginBottom: "1rem" }}>
      <Skeleton variant="text" width="60%" height={24} />
      <Skeleton variant="rectangular" height={20} sx={{ mt: 1 }} />
    </div>
  );

  // ================= JSX =================
  if (loading)
    return (
      <div className="wrapper">
        <Skeleton variant="rectangular" height={60} sx={{ mb: 2 }} />
        {[...Array(5)].map((_, i) => (
          <SkeletonQuestion key={i} />
        ))}
        <Skeleton variant="rectangular" height={48} />
      </div>
    );

  return (
    <div className="">
      <Box
        className="question-filters"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          gap: "1rem",
          mb: 3,
          maxWidth: "100%",
          flexDirection: "row",
        }}
      >
        {/* TYPE FILTER */}

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          required
        >
          <option value="">Select field type</option>
          <option value="text">Text</option>
          <option value="textarea">Textarea</option>
          <option value="radio">Radio</option>
          <option value="checkbox">Checkbox</option>
          <option value="dropdown">Dropdown</option>
        </select>

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <div
        style={{
          display: "grid",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        {filteredQuestions.map((question) => (
          <Question
            key={question?._id}
            {...questionsProps}
            question={question}
          />
        ))}
      </div>

      {
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <IconButton onClick={handlePrevPage} disabled={page === 1}>
            <ArrowBackIosIcon />
          </IconButton>
          <span style={{ margin: "0 10px", fontWeight: "bold" }}>
            Page {page}
          </span>
          <IconButton onClick={handleNextPage} disabled={!hasMore}>
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      }

      <UpdateQuestionModals {...updateQuestionsModalProps} />
      <DeleteQuestionModals {...deleteQuestionProps} />
      <AddQuestionModals {...addQuestionModalProps} />
    </div>
  );
}
