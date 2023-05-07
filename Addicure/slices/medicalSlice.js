import { createSlice } from "@reduxjs/toolkit";

export const medicalSlice = createSlice({
  name: "medical",
  initialState: {
    medical: {
        bmi: null,
        bmiValue: null,
        bfp: null,
        bfpValue: null,
    },
  },
  reducers: {
    setMedical: (state, action) => {
    state.medical = { ...state.medical, ...action.payload };
    },
  },
});

export const { setMedical } = medicalSlice.actions;

export const selectMedical = (state) => state.medical.medical;

export default medicalSlice.reducer;
