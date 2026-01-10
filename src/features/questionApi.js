import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "./Api";

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
  }),
  tagTypes: ["Question"],
  endpoints: (builder) => ({
    getQuestionsByCategory: builder.query({
      query: ({ categoryId, page = 1 , limit = 3 }) => ({
        url: `/questions/${categoryId}/insights?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Question"],
    }),

    handleGetQuestions: builder.query({
      query: ({page = 1, limit = 5 }) => ({
        url: `/questions?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Question"],
    }),

    handleGetDashboardQuestions: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/questions/dashboard?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Question"],
    }),

    handlePostQuestion: builder.mutation({
      query: ({ field }) => ({
        url: "/questions",
        method: "POST",
        body: field,
      }),
      invalidatesTags: ["Question"],
    }),

    handleDeleteQuestion: builder.mutation({
      query: ({ id }) => ({
        url: `/questions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Question"],
    }),

    handleUpdateQuestion: builder.mutation({
      query: ({ id, data }) => ({
        url: `/questions/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Question"],
    }),
  }),
});

export const {
  useGetQuestionsByCategoryQuery,
  useHandleGetDashboardQuestionsQuery,
  useHandlePostQuestionMutation,
  useHandleDeleteQuestionMutation,
  useHandleUpdateQuestionMutation,
  useHandleGetQuestionsQuery,
} = questionApi;
