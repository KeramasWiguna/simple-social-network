import { createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPosts: builder.query({
      query: () => "posts",
      providesTags: ["Post"],
    }),
  }),
});

export const { useFetchPostsQuery } = postApiSlice;
