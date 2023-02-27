import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "editorForm",
  initialState: {
    mailToInputs: "",
    subjectValue: "",
    composeMailValue: "",
    boldFont: "",
    italicFont: "",
  },
  reducers: {
    mailToFunc(state, action) {
      state.mailToInputs = action.payload;
    },
    subjectFunc(state, action) {
      state.subjectValue = action.payload;
    },
    composeMailFunc(state, action) {
      state.composeMailValue = action.payload;
    },
    boldFunc(state, action) {
      state.boldFont = action.payload;
      console.log(action.payload);
    },
    italicFunc(state, action) {
      state.italicFont = action.payload;
      console.log(action.payload);
    },
  },
});
export const {
  mailToFunc,
  subjectFunc,
  composeMailFunc,
  boldFunc,
  italicFunc,
} = formSlice.actions;
export default formSlice;
