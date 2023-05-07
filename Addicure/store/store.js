import { configureStore } from '@reduxjs/toolkit'
import userReducer from "../slices/userSlice";
import medicalReducer from "../slices/medicalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    medical: medicalReducer
  },
})