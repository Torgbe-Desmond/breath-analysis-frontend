import { useEffect, useState } from "react";
import {
  IconButton,
  Modal,
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
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

export default function Questions({ categories, questions, setQuestions }) {
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
      ? q.label.toLowerCase().includes(search.toLowerCase())
      : true;

    console.log(matchesType, matchesSearch);
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
    categories
  };

  return (
    <div className="questions-container">
      <Filter {...filterProps} />

      {filteredQuestions.map((question) => (
        <Question
          key={question?._id}
          {...questionsProps}
          question={question}
        />
      ))}

      <UpdateQuestionModals {...updateQuestionsModalProps} />
      <DeleteQuestionModals {...deleteQuestionProps} />
      <AddQuestionModals {...addQuestionModalProps} />
    </div>
  );
}
