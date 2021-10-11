import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { postApiSlice } from "../post/postSlice";

export const commentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (newComment) => ({
        url: "comments",
        method: "POST",
        body: newComment,
      }),
      invalidatesTags: ["Comment"],
    }),
    patchComment: builder.mutation({
      query: (pathedComment) => ({
        url: `comments/${pathedComment.id}`,
        method: "PATCH",
        body: pathedComment,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Comment", id: arg.id },
      ],
    }),
    removeComment: builder.mutation({
      query: (postId) => ({
        url: `comments/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Comment", id }],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  usePatchCommentMutation,
  useRemoveCommentMutation,
} = commentApiSlice;

export const commentSlice = createSlice({
  name: "comment",
  initialState: { deletedComment: [], comments: [] },
  reducers: {
    //this used to simulate removed comment on the UI since API not really deleting comment
    saveDeletedComment: (state, { payload }) => {
      state.deletedComment = [...state.deletedComment, payload];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      postApiSlice.endpoints.fetchPostComments.matchFulfilled,
      (state, { payload }) => {
        state.comments = [...payload];
      }
    );
    //this used to simulate created post on the UI since API not really create post
    builder.addMatcher(
      commentApiSlice.endpoints.createComment.matchFulfilled,
      (state, { payload }) => {
        state.comments = [...state.comments, payload];
      }
    );
    //this used to simulate edited post on the UI since API not really edit post
    builder.addMatcher(
      commentApiSlice.endpoints.patchComment.matchFulfilled,
      (state, { payload }) => {
        let edited = [...state.comments];
        let index = edited.findIndex(
          (comment) => comment.id === parseInt(payload.id)
        );
        edited.splice(index, 1, payload);
        state.comments = edited;
      }
    );
  },
});

export const selectAllComments = (state) => state.comment.comments;
export const selectCommentById = (state, commentId) =>
  state.comment.comments.find((comment) => comment.id === parseInt(commentId));

export const { saveDeletedComment } = commentSlice.actions;

export default commentSlice.reducer;
