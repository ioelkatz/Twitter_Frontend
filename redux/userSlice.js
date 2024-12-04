import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    saveUser(state, action) {
      return action.payload;
    },
  },
});
const { actions, reducer } = userSlice;
export const { saveUser, profileUser } = actions;
export default reducer;
