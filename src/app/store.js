import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import counterReducer from "../features/counter/counterSlice";
import { userService } from "../features/user/userService";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [userService.reducerPath]: userService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userService.middleware),
});

setupListeners(store.dispatch);
