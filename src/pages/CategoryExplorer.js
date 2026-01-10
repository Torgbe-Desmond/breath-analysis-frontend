import { useState, useEffect } from "react";
import { Alert, Paper } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";

import { useHandleGetCategoriesQuery } from "../features/categoryApi";
import { useGetQuestionsByCategoryQuery } from "../features/questionApi";

import LoadResponseModel from "../Modals/LoadResponseModel";
import CategorySelect from "../CategorySelect";
import Loader from "../Loader";
import QuestionList from "../QuestionList";
import Pagination from "../Pagination";
import { SignalCellularNullRounded } from "@mui/icons-material";

const PAGE_LIMIT = 3;

export default function CategoryExplorer() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [loadResponseModalOpen, setLoadResponseModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [questionLabel, setQuestionLabel] = useState("");

  const [questions, setQuestions] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [resTotalPages, setResTotalPages] = useState(0);
  const [questionId, setQuestionId] = useState("");

  // Status states
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [isFetchingCategories, setIsFetcthingCategories] = useState(false);

  const [categoryError, setCategoryError] = useState(false);

  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [isFetchingQuestions, setIsFetchingQuestions] = useState(false);
  const [questionError, setQuestionError] = useState(false);
  const [questionsSuccess, setQuestionsSuccess] = useState(false);

  /* ================= CATEGORIES ================= */
  const {
    data: categoriesData,
    isLoading: catLoading,
    isError: catError,
    isFetching: catIsFetching,
    refetch: refetchCategories,
  } = useHandleGetCategoriesQuery();

  const categories = categoriesData?.data || [];

  useEffect(() => {
    setLoadingCategories(catLoading);
    setCategoryError(!!catError);
  }, [catLoading, catError]);

  /* ================= QUESTIONS ================= */
  const {
    data: questionData,
    isLoading: qLoading,
    isError: qError,
    isFetching: qFetching,
    isSuccess,
    error,
  } = useGetQuestionsByCategoryQuery(
    selectedCategory
      ? { categoryId: selectedCategory, page, limit: PAGE_LIMIT }
      : skipToken
  );

  useEffect(() => {
    setIsFetchingQuestions(qFetching);
    setLoadingQuestions(qLoading);
    setQuestionError(!!qError);
    setQuestionsSuccess(isSuccess);

    const fetchedQuestions = qFetching
      ? []
      : questionData?.data?.questions || [];
    setQuestions(fetchedQuestions);
    setHasMore(questionData?.data?.hasMore ?? false);
    setTotalPages(questionData?.data?.totalQuestions);
  }, [questionData, qLoading, qError, isSuccess, qFetching]);

  /* ================= HANDLERS ================= */
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setPage(1);
  };

  const handleClearCategory = () => {
    setSelectedCategory("");
    setPage(1);
    setQuestions([]);
  };

  const handlePrevPage = (nextPage) => {
    if (typeof nextPage === "number") {
      setPage(nextPage);
    }
  };

  const handleNextPage = (nextPage) => {
    if (typeof nextPage === "number") {
      setPage(nextPage);
    }
  };

    const handleNextPageButton = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPageButton = () => {
    setPage((prev) => prev - 1);
  };


  /* ================= PROPS ================= */
  const categoryProps = {
    selectedCategory,
    handleCategoryChange,
    loadingCategories,
    categories,
    handleClearCategory,
    categoryError,
    catIsFetching,
    refetchCategories,
  };

  const questionProps = {
    questions,
    setLoadResponseModalOpen,
    setSearchValue,
    setResTotalPages,
    setQuestionLabel,
    setQuestionId,
  };

  const paginationProps = {
    page,
    hasMore,
    handlePrevPage,
    handleNextPage,
    handleNextPageButton,
    handlePrevPageButton,
    totalPages,
    limit: PAGE_LIMIT,
  };

  return (
    <Paper
      className="assessment-container"
      style={{ maxWidth: 800, margin: "20px auto" }}
    >
      {/* Category selection */}
      <CategorySelect {...categoryProps} />

      {/* Category / question errors */}
      {categoryError && !catIsFetching && (
        <Alert severity="error">Error loading categories</Alert>
      )}
      {questionError && !isFetchingQuestions && (
        <Alert severity="error">Error loading questions</Alert>
      )}

      {/* Info for empty questions */}
      {questionsSuccess &&
        !isFetchingQuestions &&
        questions.length === 0 &&
        selectedCategory && (
          <Alert severity="info">
            No answered questions yet for this category
          </Alert>
        )}

      {/* Loader */}
      {isFetchingQuestions && <Loader loading={true} />}

      {/* Questions */}
      <QuestionList {...questionProps} />

      {/* Pagination */}
      {questions.length > 0 && <Pagination {...paginationProps} />}

      {/* Modal */}
      <LoadResponseModel
        loadResponseModalOpen={loadResponseModalOpen}
        setLoadResponseModalOpen={setLoadResponseModalOpen}
        searchValue={searchValue}
        selectedCategory={selectedCategory}
        resTotalPages={resTotalPages}
        questionId={questionId}
        questionLabel={questionLabel}
      />
    </Paper>
  );
}
