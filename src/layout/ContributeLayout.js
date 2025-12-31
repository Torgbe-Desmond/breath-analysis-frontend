import { useEffect, useState } from "react";
import Contribute from "../pages/Contribute";
import Questions from "../Questions";
import {
  handleDeleteQuestion,
  handleGetCategories,
  handleGetQuestions,
  handlePostQuestion,
  handleUpdateQuestion,
} from "../Services/Contribute";
import Filter from "../Filter";

export default function ContributeLayout() {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  // Fetch questions

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await handleGetQuestions();
        setQuestions(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchQuestions();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await handleGetCategories();
        if (response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchCategories();
  }, []);

  const questionsProps = {
    categories,
    questions,
    setQuestions,
  };

  const contributePrps = {
    categories,
    setQuestions,
  };

  return (
    <div>
      {/* <Contribute {...contributePrps} /> */}
      <Questions {...questionsProps} />
    </div>
  );
}
