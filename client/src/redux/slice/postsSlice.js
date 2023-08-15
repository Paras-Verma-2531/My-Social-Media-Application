import { axiosClient } from "../../Utils/axiosClient";
import { setLoading } from "./appConfig";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (body, thunkAPI) => {
    try {
      //loading bar
      thunkAPI.dispatch(setLoading(true));
      //here result is coming from interceptor thus == actualResponse.data where actualResponse contains [config,data,..]
      const result = await axiosClient.post("/user/getUserProfile", body);
      console.log("Result is :", result);
      return result.response; //data is returned to extraReducers
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
//set the userProfile with it's actual data
const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    userProfile: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload;
    });
  },
});
export default postSlice.reducer;
