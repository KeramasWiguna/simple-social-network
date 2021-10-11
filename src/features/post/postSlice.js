import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPosts: builder.query({
      query: () => "posts",
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: newPost,
      }),
    }),
    patchPost: builder.mutation({
      query: (pathedPost) => ({
        url: `posts/${pathedPost.id}`,
        method: "PATCH",
        body: pathedPost,
      }),
    }),
    removePost: builder.mutation({
      query: (postId) => ({
        url: `posts/${postId}`,
        method: "DELETE",
      }),
    }),
    fetchPostComments: builder.query({
      query: (postId) => `posts/${postId}/comments`,
    }),
  }),
});

export const selectCommentResult =
  postApiSlice.endpoints.fetchPostComments.select();
const emptyComments = [];

export const selectAllComments = createSelector(
  selectCommentResult,
  (postResult) => postResult?.data ?? emptyComments
);

export const selectCommentById = createSelector(
  selectAllComments,
  (state, commentId) => commentId,
  (comments, commentId) => comments.find((comment) => comment.id === commentId)
);

export const {
  useFetchPostsQuery,
  useCreatePostMutation,
  usePatchPostMutation,
  useRemovePostMutation,
  useFetchPostCommentsQuery,
} = postApiSlice;

export const postSlice = createSlice({
  name: "post",
  initialState: { deletedPost: [], posts: [] },
  reducers: {
    //this used to simulate removed post on the UI since API not really deleting post
    saveDeletedPost: (state, { payload }) => {
      state.deletedPost = [...state.deletedPost, payload];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      postApiSlice.endpoints.fetchPosts.matchFulfilled,
      (state, { payload }) => {
        state.posts = [...payload];
      }
    );
    //this used to simulate created post on the UI since API not really create post
    builder.addMatcher(
      postApiSlice.endpoints.createPost.matchFulfilled,
      (state, { payload }) => {
        state.posts = [...state.posts, payload];
      }
    );
    //this used to simulate edited post on the UI since API not really edit post
    builder.addMatcher(
      postApiSlice.endpoints.patchPost.matchFulfilled,
      (state, { payload }) => {
        let edited = [...state.posts];
        let index = edited.findIndex(
          (post) => post.id === parseInt(payload.id)
        );
        edited.splice(index, 1, payload);
        state.posts = edited;
      }
    );
  },
});

export const selectAllPosts = (state) => state.post.posts;
export const selectPostById = (state, postId) =>
  state.post.posts.find((post) => post.id === parseInt(postId));
export const selectPostByUserId = (state, userId) =>
  state.post.posts.filter((post) => post.userId === parseInt(userId));

export const { saveDeletedPost } = postSlice.actions;

export default postSlice.reducer;
