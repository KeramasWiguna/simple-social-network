import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { apiSlice } from "../features/api/apiSlice";
import counterReducer from "../features/counter/counterSlice";
import postReducer from "../features/post/postSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    post: postReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
