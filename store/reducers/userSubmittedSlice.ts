// import { userSubmittedApi } from "@/api/contentful";
import { IUserSubmitted } from "@/api/contentful.interface";
import { userSubmittedApi } from "@/api/userSubmittedApi";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserSubmittedState {
  UserSubmitteds: IUserSubmitted[];
}

const fetchInitialState = createAsyncThunk(
  "userSubmitted/fetchInitialState",
  async () => {
    const data = await userSubmittedApi.getListUserSubmitted();
    return data ? data : [];
  }
);

const initialState: UserSubmittedState = {
  UserSubmitteds: [],
};

export const userSubmittedSlice = createSlice({
  name: "userSubmitted",
  initialState,
  reducers: {
    addUserSubmitted: (state, action: PayloadAction<IUserSubmitted>) => {
      state.UserSubmitteds.push(action.payload);

      // const items = getLocalStorageItems();
      // items.push(action.payload);
      // state.UserSubmitteds = items;
      // setLocalStorageItems(items);
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchInitialState.fulfilled, (state, action) => {
      // Add user to the state array
      state.UserSubmitteds = action.payload;
    });
  },
});

export { fetchInitialState };
// Action creators are generated for each case reducer function
export const { addUserSubmitted } = userSubmittedSlice.actions;

export default userSubmittedSlice.reducer;
