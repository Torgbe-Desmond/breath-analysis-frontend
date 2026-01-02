import { configureStore } from "@reduxjs/toolkit";
import { responseApi } from "./responseApi";
import { categoryApi } from "./categoryApi";
import { questionApi } from "./questionApi";
import { feedbackApi } from "./feedbackApi";

export const store = configureStore({
  reducer: {
    [questionApi.reducerPath]: questionApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [responseApi.reducerPath]: responseApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      questionApi.middleware,
      categoryApi.middleware,
      responseApi.middleware,
      feedbackApi.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});
