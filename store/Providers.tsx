"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
// import { fetchInitialState } from "./reducers/userSubmittedSlice";

export default function Providers({ children }: { children: React.ReactNode }) {
  // useEffect(() => {
  //   store.dispatch(fetchInitialState());
  // }, []);

  return <Provider store={store}>{children}</Provider>;
}
