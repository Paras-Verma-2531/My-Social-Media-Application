import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./slice/appConfig";
export default configureStore({
  reducer: {appConfigReducer},
});
