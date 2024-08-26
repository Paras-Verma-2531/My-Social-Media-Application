import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./slice/appConfig";
import postReducer from "./slice/postsSlice";
import feedReducer from "./slice/feedSlice";
// The entire store has 3 major reducers namely [ appConfigReducer,postReducer,feedReducer]
export default configureStore({
  reducer: { appConfigReducer, postReducer, feedReducer },
});
