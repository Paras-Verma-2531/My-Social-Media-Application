import { axiosClient } from "../../Utils/axiosClient";
import { setLoading } from "./appConfig";
import { likesAndDislike } from "./postsSlice";
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
//follow or Unfollow thunk
export const followOrUnfollow = createAsyncThunk(
  "user/followOrUnfollow",
  async (body, thunkAPI) => {
    try {
    } catch (error) {}
  }
);
const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    feedData: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.fulfilled, (state, action) => {
        state.feedData = action.payload;
      })
      // to handle like of feed data
      .addCase(likesAndDislike.fulfilled, (state, action) => {
        const post = action.payload;
        const index = state?.feedData?.posts?.findIndex(
          (item) => item._id === post._id
        );
        if (index !== undefined && index !== -1) {
          state.feedData.posts[index] = post;
        }
      });
  },
});
export default feedSlice.reducer;
