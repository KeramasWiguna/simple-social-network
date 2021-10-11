import { createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => "users",
      providesTags: ["User"],
    }),
  }),
});

export const { useFetchUsersQuery } = userApiSlice;

export const selectUsersResult = userApiSlice.endpoints.fetchUsers.select();
const emptyUsers = [];

export const selectAllUsers = createSelector(
  selectUsersResult,
  (usersResult) => usersResult?.data ?? emptyUsers
);

export const selectUserById = createSelector(
  selectAllUsers,
  (state, userId) => userId,
  (users, userId) => users.find((user) => user.id === parseInt(userId))
);
