import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./slice/appConfig";
import postReducer from "./slice/postsSlice";
export default configureStore({
  reducer: { appConfigReducer, postReducer },
});
