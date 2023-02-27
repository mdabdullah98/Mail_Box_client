import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/AuthSlice";
import formSlice from "./Slices/MailFormSlice";
import mailInboxSlice from "./Slices/MailInboxSlice";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    editorForm: formSlice.reducer,
    mail: mailInboxSlice.reducer,
  },
});
export default store;
