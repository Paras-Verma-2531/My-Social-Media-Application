import { axiosClient } from "../../Utils/axiosClient";
import { setLoading } from "./appConfig";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
//getUserProfile async thunk
export const getFeedData = createAsyncThunk(
  "user/getFeedData",
  async (_, thunkAPI) => {
    try {
      //loading bar
      thunkAPI.dispatch(setLoading(true));
      //here result is coming from interceptor thus == actualResponse.data where actualResponse contains [config,data,..]
      const result = await axiosClient.get("/user/getFeedData");
      console.log(result.response);
      return result.response; //data is returned to extraReducers
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    feedData: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedData.fulfilled, (state, action) => {
      state.feedData = action.payload;
    });
  },
});
export default feedSlice.reducer;
