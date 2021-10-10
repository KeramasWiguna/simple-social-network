import { createSelector } from "@reduxjs/toolkit";
import { userService } from "./userService";

export const selectUsersResult = userService.endpoints.fetchUsers.select();
const emptyUsers = [];

export const selectAllUsers = createSelector(
  selectUsersResult,
  (usersResult) => usersResult?.data ?? emptyUsers
);

export const selectUserById = createSelector(
  selectAllUsers,
  (state, userId) => userId,
  (users, userId) => users.find((user) => user.id === userId)
);
