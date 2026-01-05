import { useEffect, useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";

import Contribute from "../pages/Contribute";
import Questions from "../Questions";
import { useHandleGetCategoriesQuery } from "../features/categoryApi";
import { useHandleGetDashboardQuestionsQuery } from "../features/questionApi";
import { useHandleGetFeedbacksQuery } from "../features/feedbackApi";
import Feedback from "../Feedback";

// ---------------- TAB PANEL HELPER ----------------
function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ mt: 2 }}>{children}</Box>}
    </div>
  );
}

const PAGE_LIMIT = 5;

export default function ContributeLayout() {
  const [tab, setTab] = useState(0);
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalQuestions, setTotalQuestions] = useState(0);

  // Status states
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [questionsError, setQuestionsError] = useState(false);
  const [questionsSuccess, setQuestionsSuccess] = useState(false);

  const { data, isLoading, isError } = useHandleGetFeedbacksQuery({
    page: 1,
    limit: 10,
  });

  const feedbacks = data?.data?.results || [];

  // ================= CATEGORIES =================
  const {
    data: categoriesData,
    isLoading: catLoading,
    isError: catError,
  } = useHandleGetCategoriesQuery();
  useEffect(() => {
    setLoadingCategories(catLoading);
    setCategoryError(!!catError);
    setCategories(categoriesData?.data || []);
  }, [categoriesData, catLoading, catError]);

  // ================= QUESTIONS =================
  const {
    data: questionsData,
    isLoading: qLoading,
    isFetching,
    isError: qError,
    isSuccess,
  } = useHandleGetDashboardQuestionsQuery({ page, limit: PAGE_LIMIT });

  useEffect(() => {
    setLoadingQuestions(qLoading || isFetching);
    setQuestionsError(!!qError);
    setQuestionsSuccess(isSuccess);

    const fetchedQuestions = questionsData?.data?.questions || [];
    setQuestions(fetchedQuestions);
    setTotalQuestions(questionsData?.data?.totalQuestions || 0);
    setHasMore(questionsData?.data?.hasMore ?? false);
  }, [questionsData, qLoading, isFetching, qError, isSuccess]);

  // ================= HANDLERS =================
  const handlePrevPage = () => setPage((p) => Math.max(p - 1, 1));
  const handleNextPage = () => setPage((p) => (hasMore ? p + 1 : p));
  const handleTabChange = (_, newValue) => setTab(newValue);

  // ================= PROPS =================
  const contributeProps = { categories, setQuestions };
  const questionsProps = {
    categories,
    questions,
    setQuestions,
    handlePrevPage,
    handleNextPage,
    hasMore,
    page,
    totalQuestions,
    loading: loadingQuestions,
  };

  // ================= JSX =================
  return (
    <Box sx={{ maxWidth: "1000px", mx: "auto", mt: 4, p: 2 }}>
      {/* ---------- TABS ---------- */}
      <Tabs
        value={tab}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="Add Question" />
        <Tab label="All Questions" />
        <Tab label="Feedbacks" />
      </Tabs>

      {/* ---------- TAB CONTENT ---------- */}
      <TabPanel value={tab} index={0}>
        {categoryError && (
          <Typography color="error">Error loading categories</Typography>
        )}
        <Contribute {...contributeProps} />
      </TabPanel>

      <TabPanel value={tab} index={1}>
        {questionsError && (
          <Typography color="error">Error loading questions</Typography>
        )}
        {questionsSuccess && questions.length === 0 && (
          <Typography color="text.secondary">No questions yet.</Typography>
        )}
        <Questions {...questionsProps} />
      </TabPanel>

      <TabPanel value={tab} index={2}>
        <Feedback />
      </TabPanel>
    </Box>
  );
}
