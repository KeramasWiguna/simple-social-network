import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPosts: builder.query({
      query: () => "posts",
      providesTags: ["Post"],
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Post"],
    }),
    patchPost: builder.mutation({
      query: (pathedPost) => ({
        url: `posts/${pathedPost.id}`,
        method: "PATCH",
        body: pathedPost,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    removePost: builder.mutation({
      query: (postId) => ({
        url: `posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Post", id }],
    }),
  }),
});

export const selectPostResult = postApiSlice.endpoints.fetchPosts.select();
const emptyPosts = [];

export const selectAllPosts = createSelector(
  selectPostResult,
  (postResult) => postResult?.data ?? emptyPosts
);

export const selectPostByUserId = createSelector(
  selectAllPosts,
  (state, userId) => userId,
  (posts, userId) => posts.filter((post) => post.userId === userId)
);

export const {
  useFetchPostsQuery,
  useCreatePostMutation,
  usePatchPostMutation,
  useRemovePostMutation,
} = postApiSlice;

export const postSlice = createSlice({
  name: "post",
  initialState: { deletedPost: [] },
  reducers: {
    //this used to simulate removed post on the UI since API not really deleting post
    saveDeletedPost: (state, { payload }) => {
      state.deletedPost = [...state.deletedPost, payload];
    },
  },
});

export const { saveDeletedPost } = postSlice.actions;

export default postSlice.reducer;
