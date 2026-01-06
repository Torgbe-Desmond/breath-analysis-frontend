import React from "react";
import { useEffect, useState } from "react";
import { handleGetQuestions } from "../Services/Contribute";
import {
  CreateResponse,
  GetResponseByEmail,
  UpdateResponse,
} from "../Services/Assessment";
import AlertInfo from "../AlertInfo";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  LinearProgress,
  Paper,
  Skeleton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

import { useHandleGetQuestionsQuery } from "../features/questionApi";
import {
  useCreateResponseMutation,
  useGetResponseByEmailQuery,
  useUpdateResponseMutation,
} from "../features/responseApi";
import { skipToken } from "@reduxjs/toolkit/query";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Outlet } from "react-router-dom";

const emailSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
});
function AssessmentLayout() {
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: emailSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: () => {},
  });


  const email = formik.values.email;

  /* ================= RTK QUERY ================= */

  // Questions
  const {
    data: questionsData,
    isLoading: loadingQuestions,
    isError: isQuestionsError,
    isFetching,
    refetch,
  } = useHandleGetQuestionsQuery();

  const questions = questionsData?.data || [];

  // Existing response (email dependent)
  const {
    data: existingResponse,
    isFetching: resIsFetching,
    isError: resIsError,
    isSuccess: resIsSuccess,
  } = useGetResponseByEmailQuery(email, {
    refetchOnMountOrArgChange: true,
  });


  // Mutations
  const [createResponse, { isLoading: creating, isSuccess }] =
    useCreateResponseMutation();

  const [updateResponse, { isLoading: updating }] = useUpdateResponseMutation();

  const loadingSubmit = creating || updating;
  
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default AssessmentLayoute;
