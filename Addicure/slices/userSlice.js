import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
        name: null,
        // age: null,
        weight: null,
        height: null,
        dob: null,
        sex: null,
        goal: null,
        desiredGoal: null,
    },
  },
  reducers: {
    setUser: (state, action) => {
    state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
