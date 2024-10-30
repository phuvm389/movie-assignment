import { configureStore } from "@reduxjs/toolkit";
import userSubmittedSlice from "./reducers/userSubmittedSlice";

//create a store and give it reducers
export const store = configureStore({
  reducer: {
    userSubmitted: userSubmittedSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
