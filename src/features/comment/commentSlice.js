import { createSelector, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

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

export const postSlice = createSlice({
  name: "comment",
  initialState: { deletedComment: [] },
  reducers: {
    //this used to simulate removed comment on the UI since API not really deleting comment
    saveDeletedComment: (state, { payload }) => {
      state.deletedComment = [...state.deletedComment, payload];
    },
  },
});

export const { saveDeletedComment } = postSlice.actions;

export default postSlice.reducer;
