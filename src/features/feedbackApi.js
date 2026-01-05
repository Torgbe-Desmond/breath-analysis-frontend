import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "./Api";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
  }),
  tagTypes: ["Feedback"],
  endpoints: (builder) => ({
    handleGetFeedbacks: builder.query({
      query: ({ page, limit }) => ({
        url: `/feedbacks?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Feedback"],
    }),
    handleCreateFeedback: builder.mutation({
      query: ({ message }) => ({
        url: "/feedbacks",
        method: "POST",
        body: { message },
      }),
      invalidatesTags: ["Feedback"],
    }),
  }),
});

export const { useHandleCreateFeedbackMutation, useHandleGetFeedbacksQuery } =
  feedbackApi;
