import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "./Api";

export const responseApi = createApi({
  reducerPath: "responseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
  }),
  tagTypes: ["Response"],
  endpoints: (builder) => ({
    // ================= CREATE RESPONSE =================
    createResponse: builder.mutation({
      query: ({ answers, email }) => ({
        url: "/responses",
        method: "POST",
        body: {
          answers,
          email,
        },
      }),
      invalidatesTags: ["Response"],
    }),

    // ================= UPDATE RESPONSE =================
    updateResponse: builder.mutation({
      query: ({ responseId, answers, email }) => ({
        url: `/responses/${responseId}`,
        method: "PUT",
        body: {
          email,
          answers,
        },
      }),
      invalidatesTags: ["Response"],
    }),

    // ================= GET RESPONSE BY EMAIL =================
    getResponseByEmail: builder.query({
      query: (email) => ({
        url: "/responses/email",
        method: "POST",
        body: { email },
      }),
      providesTags: ["Response"],
    }),

    // ================= GET ALL RESPONSES =================
    getAllResponses: builder.query({
      query: () => ({
        url: "/responses",
        method: "GET",
      }),
      providesTags: ["Response"],
    }),

    // ================= SEARCH RESPONSES BY VALUE =================
    getResponsesByValue: builder.query({
      query: ({ value, page = 1, limit = 3 }) => ({
        url: `/responses/search?page=${page}&limit=${limit}`,
        method: "POST",
        body: { value },
      }),
      providesTags: ["Response"],
    }),

    // ================= GET RESPONSE BY ID =================
    getResponseById: builder.query({
      query: (id) => ({
        url: `/responses/search/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Response", id }],
    }),
  }),
});

export const {
  useCreateResponseMutation,
  useUpdateResponseMutation,
  useGetResponseByEmailQuery,
  useLazyGetResponseByEmailQuery,
  useGetAllResponsesQuery,
  useGetResponsesByValueQuery,
  useLazyGetResponsesByValueQuery,
  useGetResponseByIdQuery,
} = responseApi;
